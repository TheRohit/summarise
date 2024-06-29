"use client";

import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { transcribe } from "~/actions/transcribe";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const ChatCompletion = () => {
  const [generation, setGeneration] = useState<string>("");

  const doStuff = async () => {
    const streamableValue = await transcribe();
    for await (const message of readStreamableValue<string>(streamableValue)) {
      if (message) setGeneration(message);
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
