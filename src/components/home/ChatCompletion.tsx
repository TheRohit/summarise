import { createOpenAI } from "@ai-sdk/openai";

import { generateText } from "ai";
import { env } from "~/env";

const ChatCompletion = async () => {
  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: env.GROQ_API_KEY,
  });
  const { text } = await generateText({
    model: groq("llama3-70b-8192"),
    prompt: "what is the fastest car? keep it under 100 words",
  });
  return <div className="px-20">{text}</div>;
};

export default ChatCompletion;
