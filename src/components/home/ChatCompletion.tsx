"use client";

import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { transcribe } from "~/actions/transcribe";
import ShineBorder from "../magicui/shine-border";
import InputForm from "./InputForm";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const ChatCompletion = () => {
  const [generation, setGeneration] = useState<string>("");
  const [transcription, setTranscription] = useState<string>("");

  const doStuff = async () => {
    const streamableValue = await transcribe();
    for await (const message of readStreamableValue<string>(streamableValue)) {
      if (message) setTranscription(message);
      console.log(message);
    }
  };

  return (
    <ShineBorder
      className="p-10 text-2xl font-bold capitalize shadow-sm"
      color={"white"}
    >
      <div className="z-10">
        {/* <Button onClick={doStuff}>Ask</Button> */}
        <InputForm setGeneration={setGeneration} />

        <div>{transcription}</div>
      </div>
    </ShineBorder>
  );
};

export default ChatCompletion;
