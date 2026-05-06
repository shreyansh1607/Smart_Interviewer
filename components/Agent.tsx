"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [redirecting, setRedirecting] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    console.log("Agent mounted", {
      userName,
      userId,
      interviewId,
      type,
      questions,
    });
    const onCallStart = () => {
      console.log("Vapi call started", { interviewId, userId });
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("Vapi call ended", { interviewId, userId });
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        console.log("Transcript message received", newMessage);
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("Speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("Speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Vapi error", { error });
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    console.log("Agent state update", {
      messages,
      callStatus,
      feedbackId,
      interviewId,
      type,
      userId,
    });
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("Generating feedback", { interviewId, userId, messages });
      setRedirecting(true);
      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });
      if (success && id) {
        console.log("Feedback generated and redirecting", {
          interviewId,
          feedbackId: id,
        });
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback, redirecting home", { interviewId });
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED && !hasRedirected) {
      setHasRedirected(true);
      setRedirecting(true);
      if (type === "generate") {
        // Redirect to dashboard interviews tab after Vapi call ends
        router.push("/dashboard?tab=interviews");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, hasRedirected, router, type, userId]);

  const handleCall = async () => {
    console.log("Call initiated", {
      type,
      userName,
      userId,
      interviewId,
      questions,
    });
    setCallStatus(CallStatus.CONNECTING);
    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }
      console.log("Starting Vapi interview", { formattedQuestions });
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    console.log("Manual disconnect called", { interviewId, userId });
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      <div className="transcript-border">
        <div className="transcript">
          {messages.length > 0 ? (
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          ) : (
            <p className="interview-text">Transcription will appear here.</p>
          )}
        </div>
      </div>

      {redirecting && (
        <div className="mx-auto mb-4 max-w-xl rounded-2xl border border-violet-500/20 bg-slate-950/85 px-4 py-3 text-center text-sm text-slate-100 shadow-lg shadow-violet-500/10">
          {type === "generate"
            ? "Call ended — redirecting you back to the dashboard..."
            : "Call ended — saving feedback and redirecting you to the feedback page..."}
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button
            className="relative btn-call"
            onClick={() => handleCall()}
            disabled={redirecting}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {redirecting
                ? type === "generate"
                  ? "Redirecting..."
                  : "Saving feedback..."
                : callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button
            className="btn-disconnect"
            onClick={() => handleDisconnect()}
            disabled={redirecting}
          >
            {redirecting ? "Ending..." : "End"}
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
