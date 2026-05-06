import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

export const runtime = "nodejs";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function GET() {
  return Response.json({ success: true, ok: true }, { status: 200 });
}

export async function OPTIONS() {
  // Helpful for some clients / proxies; same-origin requests won't need CORS.
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}

function isMissingModuleError(e: unknown) {
  const msg = (e as any)?.message ? String((e as any).message) : "";
  return msg.includes("Cannot find module") || msg.includes("ERR_MODULE_NOT_FOUND");
}

// NOTE: OpenRouter/OpenAI JSON-schema response_format requires a complete `required`
// array that includes all keys. Zod `.optional()` can produce an incompatible schema,
// so we model "unknown" as `null` instead and normalize later.
const extractedFormSchema = z.object({
  role: z
    .string()
    .min(1)
    .nullable()
    .describe("Best-fit target role, or null if unclear."),
  level: z
    .string()
    .min(1)
    .nullable()
    .describe("Seniority level, or null if unclear."),
  techstack: z
    .array(z.string().min(1))
    .nullable()
    .describe("List of core technologies, or null if unclear."),
  type: z
    .enum(["technical", "behavioural", "balanced"])
    .nullable()
    .describe("Interview focus. Prefer balanced if unclear; null if truly unknown."),
  amount: z
    .number()
    .int()
    .min(1)
    .max(20)
    .nullable()
    .describe("Recommended number of questions, or null if unclear."),
  notes: z
    .string()
    .nullable()
    .describe("Short reasoning and any missing fields, or null."),
});

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

async function fileToText(file: File): Promise<string> {
  const name = (file.name || "").toLowerCase();
  const mime = (file.type || "").toLowerCase();
  const buf = Buffer.from(await file.arrayBuffer());

  // Plain text
  if (mime.startsWith("text/") || name.endsWith(".txt")) {
    return buf.toString("utf8");
  }

  // PDF
  if (mime === "application/pdf" || name.endsWith(".pdf")) {
    let pdfParse: ((data: Buffer) => Promise<{ text: string }>) | null = null;
    try {
      pdfParse = (await import("pdf-parse")).default as unknown as (
        data: Buffer
      ) => Promise<{ text: string }>;
    } catch (e) {
      if (isMissingModuleError(e)) {
        throw new Error(
          'PDF parsing dependency missing. Run `npm install` (needs "pdf-parse").'
        );
      }
      throw e;
    }
    const data = await pdfParse(buf);
    return data.text ?? "";
  }

  // DOCX
  if (
    mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  ) {
    let mammoth: any;
    try {
      mammoth = await import("mammoth");
    } catch (e) {
      if (isMissingModuleError(e)) {
        throw new Error(
          'DOCX parsing dependency missing. Run `npm install` (needs "mammoth").'
        );
      }
      throw e;
    }
    const res = await mammoth.extractRawText({ buffer: buf });
    return res.value ?? "";
  }

  throw new Error("Unsupported file type. Please upload PDF, DOCX, or TXT.");
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return Response.json(
        {
          success: false,
          error:
            "Server missing OPENROUTER_API_KEY. Set it in your environment and restart dev server.",
        },
        { status: 500 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      return Response.json(
        {
          success: false,
          error:
            'Invalid content-type. Send "multipart/form-data" with a file field named "resume".',
        },
        { status: 415 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return Response.json(
        {
          success: false,
          error:
            'Missing resume file. Send "multipart/form-data" with a file field named "resume".',
        },
        { status: 400 }
      );
    }

    // Guard to prevent giant uploads from killing the connection in dev.
    const maxBytes = 3 * 1024 * 1024; // 3MB
    if (typeof file.size === "number" && file.size > maxBytes) {
      return Response.json(
        {
          success: false,
          error: "Resume file too large. Please upload a file under 3MB.",
        },
        { status: 413 }
      );
    }

    let resumeText = "";
    try {
      resumeText = (await fileToText(file)).trim();
    } catch (e: any) {
      return Response.json(
        {
          success: false,
          error: e?.message ?? "Failed to parse the resume file.",
        },
        { status: 400 }
      );
    }
    if (!resumeText) {
      return Response.json(
        { success: false, error: "Could not read text from resume." },
        { status: 400 }
      );
    }

    const maxChars = 30_000;
    const trimmed = resumeText.length > maxChars ? resumeText.slice(0, maxChars) : resumeText;

    const { object } = await generateObject({
      model: openrouter.chat("openai/gpt-4o-mini"),
      schema: extractedFormSchema,
      system:
        "You extract structured interview setup fields from resume text. Be conservative: if a field is unclear, omit it.",
      prompt: `Extract interview setup fields from this resume text.

Rules:
- role: a target role the candidate fits best (e.g. Frontend Developer, Data Analyst).
- level: infer seniority from experience (e.g. Intern, Junior, Mid, Senior, Staff).
- techstack: return 5-15 core items (React, Node.js, PostgreSQL, AWS, etc).
- type: technical/behavioural/balanced. Prefer balanced if unsure.
- amount: 5-20. Use 5 if unsure.
- notes: short explanation + missing fields.

Resume text:
${trimmed}`,
    });

    const normalized = {
      role: object.role ? object.role.trim() || undefined : undefined,
      level: object.level ? object.level.trim() || undefined : undefined,
      techstack: Array.isArray(object.techstack)
        ? object.techstack.map((t) => t.trim()).filter(Boolean).slice(0, 25)
        : undefined,
      type: object.type ?? undefined,
      amount:
        typeof object.amount === "number"
          ? clampInt(object.amount, 1, 20)
          : undefined,
      notes: object.notes ? object.notes.trim() || undefined : undefined,
    };

    return Response.json(
      {
        success: true,
        data: normalized,
        meta: {
          originalFileName: file.name || null,
          extractedChars: trimmed.length,
        },
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("[/api/resume/extract] error", e);
    return Response.json(
      {
        success: false,
        error: e?.message ?? "Failed to extract resume.",
      },
      { status: 500 }
    );
  }
}

