"use client";

import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { generate } from "~/actions/generate";
import { transcribe } from "~/actions/transcribe";

export const dynamic = "force-dynamic";
export const maxDuration = 30;
interface Message {
  rateLimitReached: any;
  transcription?: string;
  audio?: string;
  result?: string;
  weather?: string;
  spotify?: string;
  time?: string;
}

const ChatCompletion = () => {
  const [generation, setGeneration] = useState<string>("");

  const doStuff = async () => {
    const streamableValue = await transcribe();
    for await (const message of readStreamableValue<Message>(streamableValue)) {
      if (message?.transcription) setGeneration(message.transcription);
    }
  };

  console.log(generation);
  return (
    <div>
      <button onClick={doStuff}>Ask</button>

      <div>{generation}</div>
    </div>
  );
};

export default ChatCompletion;
