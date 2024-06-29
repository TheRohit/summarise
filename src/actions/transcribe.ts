"use server";

import { createStreamableValue } from "ai/rsc";
import { transcribeAudio } from "~/app/utils/transcribeAudio";

export async function transcribe() {
  "use server";

  const streamable = createStreamableValue("");
  (async () => {
    const timestamp = Date.now();
    const transcription = await transcribeAudio(timestamp);
    streamable.update(transcription);
    streamable.done();
  })();

  return streamable.value;
}
