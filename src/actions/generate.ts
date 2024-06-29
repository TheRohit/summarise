"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { env } from "~/env";

export async function generate(input: string) {
  "use server";

  const stream = createStreamableValue("");
  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: env.GROQ_API_KEY,
  });

  (async () => {
    const { textStream } = await streamText({
      model: groq("llama3-70b-8192"),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
