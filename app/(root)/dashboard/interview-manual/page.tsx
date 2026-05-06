"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ArrowRight,
  FileUp,
  Hash,
  Layers3,
  SlidersHorizontal,
  Sparkles,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import styles from "./interviewManual.module.css";

const manualInterviewSchema = z.object({
  role: z.string().min(1, "Role is required"),
  level: z.string().min(1, "Level is required"),
  techstack: z.string().min(1, "Tech stack is required"),
  type: z.enum(["technical", "behavioural", "balanced"]).default("technical"),
  amount: z.coerce.number().int().min(1).max(20).default(5),
});

type ManualInterviewValues = z.infer<typeof manualInterviewSchema>;

export default function ManualInterviewForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ManualInterviewValues>({
    resolver: zodResolver(manualInterviewSchema),
    defaultValues: {
      role: "",
      level: "",
      techstack: "",
      type: "technical",
      amount: 5,
    },
    mode: "onChange",
  });

  const [generating, setGenerating] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractNotes, setExtractNotes] = useState<string | null>(null);

  const techstackHint = useMemo(
    () => 'Comma-separated. Example: "React, TypeScript, Node.js, PostgreSQL"',
    []
  );

  const handleGenerate = async (values: ManualInterviewValues) => {
    setGenerating(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in to create an interview.");

      const payload = { ...values, userid: user.uid };
      const res = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to generate interview");
      toast.success("Interview generated");
      router.push("/dashboard?tab=interviews");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  const handleExtract = async () => {
    if (!resumeFile) {
      toast.error("Please upload a resume file first.");
      return;
    }

    setExtracting(true);
    setExtractNotes(null);

    try {
      const fd = new FormData();
      fd.append("resume", resumeFile);

      const res = await fetch("/api/resume/extract", { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok || !json?.success) {
        throw new Error(json?.error || "Failed to extract resume.");
      }

      const data = json?.data as
        | {
            role?: string;
            level?: string;
            techstack?: string[];
            type?: "technical" | "behavioural" | "balanced";
            amount?: number;
            notes?: string;
          }
        | undefined;

      if (!data) throw new Error("Resume extraction returned no data.");

      const current = form.getValues();

      if (data.role && !current.role) form.setValue("role", data.role, { shouldValidate: true });
      if (data.level && !current.level)
        form.setValue("level", data.level, { shouldValidate: true });
      if (data.techstack?.length && !current.techstack) {
        form.setValue("techstack", data.techstack.join(", "), { shouldValidate: true });
      }
      if (data.type) form.setValue("type", data.type, { shouldValidate: true });
      if (typeof data.amount === "number") {
        form.setValue("amount", data.amount, { shouldValidate: true });
      }

      if (data.notes) setExtractNotes(data.notes);

      toast.success("Autofilled from resume. Please review before generating.");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to parse resume.");
    } finally {
      setExtracting(false);
    }
  };

  const onPickFile = (file: File | null) => {
    setResumeFile(file);
    if (file) toast.message(`Selected: ${file.name}`);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) onPickFile(file);
  };

  return (
    <div className={styles.section}>
      <div className={styles.headerBar}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon} aria-hidden>
            <FileUp size={20} />
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Create Interview</h1>
            <p className={styles.subtitle}>
              Fill the form manually, or upload your resume to auto-fill and then review before
              generating.
            </p>
          </div>
        </div>

        <button
          type="button"
          className={styles.switchBtn}
          onClick={() => router.push("/interview")}
        >
          Prefer our voice-based generation?
          <span className="inline-flex items-center gap-2 text-violet-200">
            Switch to Vapi Interview Generation <ArrowRight size={16} />
          </span>
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.stepHeader}>
            <div className={styles.stepLeft}>
              <div className={styles.stepNumber}>1</div>
              <div>
                <div className={styles.cardTitle}>Resume (Optional)</div>
                <p className={styles.cardDesc}>
                  Upload a PDF/DOCX/TXT resume. We’ll extract details and prefill fields.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.cardContent}>
            <div
              className={styles.dropzone}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
              }}
            >
              <div className={styles.dropIconWrap} aria-hidden>
                <FileUp size={26} />
              </div>
              <div className={styles.dropTitle}>Drag & drop your file here</div>
              <div className={styles.dropSub}>PDF, DOCX, or TXT (Max 3MB)</div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
            />

            <div className={styles.fileBar}>
              <div className={styles.fileName}>{resumeFile ? resumeFile.name : "No file chosen"}</div>
              <button
                type="button"
                className={styles.browseBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                Browse
              </button>
            </div>

            <div className={styles.row}>
              <Button
                type="button"
                onClick={handleExtract}
                disabled={extracting || !resumeFile}
                className="rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-[0_14px_40px_rgba(168,85,247,0.22)] hover:shadow-[0_18px_54px_rgba(168,85,247,0.34)]"
              >
                {extracting ? "Parsing & autofilling..." : "Parse & Autofill"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="rounded-xl border border-[rgba(168,85,247,0.28)] bg-[rgba(10,16,30,0.72)] text-[#dff0ff] hover:bg-[rgba(18,28,44,0.92)]"
                onClick={() => {
                  setResumeFile(null);
                  setExtractNotes(null);
                  toast.message("Resume cleared");
                }}
                disabled={extracting && !!resumeFile}
              >
                Clear
              </Button>
            </div>

            {extractNotes ? (
              <div className={styles.noteBox}>
                <div className={styles.noteTitle}>Extractor notes</div>
                <div className={styles.noteBody}>{extractNotes}</div>
              </div>
            ) : null}

            <div className={styles.hint}>
              Tip: autofill only fills empty fields. Manual edits won’t be overwritten.
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.stepHeader}>
            <div className={styles.stepLeft}>
              <div className={styles.stepNumber}>2</div>
              <div>
                <div className={styles.cardTitle}>Interview Details</div>
                <p className={styles.cardDesc}>Review/edit the fields. Then generate your interview.</p>
              </div>
            </div>
            <span className={`${styles.badge} ${styles.badgeManual}`}>Manual</span>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerate)} className={styles.formStack}>
              <div className={styles.formFields}>
                <div className={styles.formGrid2}>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className={styles.fieldLabelRow}>
                          <User className={styles.fieldIcon} />
                          Role
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Frontend Developer"
                          className="bg-[rgba(14,22,38,0.92)] border-[rgba(127,169,242,0.22)] text-[#e9f3ff] rounded-xl h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className={styles.fieldLabelRow}>
                          <SlidersHorizontal className={styles.fieldIcon} />
                          Level
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Junior, Mid, Senior"
                          className="bg-[rgba(14,22,38,0.92)] border-[rgba(127,169,242,0.22)] text-[#e9f3ff] rounded-xl h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>

              <FormField
                control={form.control}
                name="techstack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className={styles.fieldLabelRow}>
                        <Layers3 className={styles.fieldIcon} />
                        Tech Stack
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={techstackHint}
                        className="bg-[rgba(14,22,38,0.92)] border-[rgba(127,169,242,0.22)] text-[#e9f3ff] rounded-xl h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{techstackHint}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className={styles.fieldLabelRow}>
                        <SlidersHorizontal className={styles.fieldIcon} />
                        Interview Focus
                      </span>
                    </FormLabel>
                    <FormControl>
                      <select
                        className={styles.select}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <option value="technical">Technical</option>
                        <option value="behavioural">Behavioural</option>
                        <option value="balanced">Balanced</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className={styles.fieldLabelRow}>
                        <Hash className={styles.fieldIcon} />
                        Number of Questions
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        inputMode="numeric"
                        className="bg-[rgba(14,22,38,0.92)] border-[rgba(127,169,242,0.22)] text-[#e9f3ff] rounded-xl h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Between 1 and 20.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

              <div className={styles.footer}>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-[0_18px_56px_rgba(168,85,247,0.28)] hover:shadow-[0_22px_72px_rgba(168,85,247,0.4)]"
                  disabled={generating || extracting || !form.formState.isValid}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    {generating ? "Generating..." : "Generate Interview"}
                  </span>
                </Button>
                <div className={styles.finePrint}>
                  We’ll generate the questions and save the interview to your account.
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
