import Groq from "groq-sdk";
import { traceable } from "langsmith/traceable";
import fs from "fs";
import { toFile } from "openai";
import { env } from "~/env";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export const transcribeAudio = traceable(
  async (timestamp: number) => {
    const filePath = "/tmp/audio.wav";
    const fileData = fs.readFileSync(filePath);
    const blob = new Blob([fileData], { type: "audio/wav" });
    if (!(blob instanceof Blob)) throw new Error("No audio detected");

    try {
      const transcription = await groq?.audio?.transcriptions?.create({
        file: await toFile(blob, `audio-${timestamp}.wav`),
        model: "whisper-large-v3",
      });
      return transcription?.text;
    } catch (error) {
      console.error("Error transcribing audio:", error);
      return "Error transcribing audio. Please try again later.";
    }
  },
  { name: "transcribeAudio" },
);
