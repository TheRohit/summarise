"use server";

import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";
import { LinkRequest, LinkValidator } from "~/lib/validators/link";

export async function download(input: LinkRequest) {
  "use server";

  const { url } = LinkValidator.parse(input);

  (async () => {
    try {
      const audioStream = ytdl(url, {
        filter: "audioonly",
      });

      const videoMetaData = await ytdl.getBasicInfo(url);
      console.log(videoMetaData);
      const audioPath = path.join("/tmp", "audio.webm");
      const audioFile = fs.createWriteStream(audioPath);
      audioStream.pipe(audioFile);
      audioFile.on("finish", () => {
        console.log("Audio file downloaded successfully");
      });
    } catch (error) {
      console.error("bruh moment");
    }
  })();
}
