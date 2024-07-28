import ytdl from "ytdl-core";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { LinkValidator } from "~/lib/validators/link";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { body: { url: string } };
    const { url } = LinkValidator.parse(body);

    const audioStream = ytdl(url, {
      filter: "audioonly",
    });

    const videoMetaData = await ytdl.getBasicInfo(url);
    console.log(videoMetaData);
    const audioPath = path.join("/tmp", "audio.mp4");
    const audioFile = fs.createWriteStream(audioPath);
    audioStream.pipe(audioFile);
    audioFile.on("finish", () => {
      console.log("Audio file downloaded successfully");
    });

    return new Response("ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid URL passed", { status: 422 });
    }
    return new Response("Could not Process", {
      status: 500,
    });
  }
}
