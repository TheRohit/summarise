"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { readStreamableValue } from "ai/rsc";
import getYouTubeID from "get-youtube-id";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generate } from "~/actions/generate";
import { transcribe } from "~/actions/transcribe";
import { cn } from "~/lib/utils";
import { LinkValidator, type LinkRequest } from "~/lib/validators/link";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import ShineBorder from "../magicui/shine-border";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import GeneratedContent from "./GeneratedContent";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const ChatCompletion = () => {
  const [generation, setGeneration] = useState<string>("");
  const [transcription, setTranscription] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const form = useForm<LinkRequest>({
    resolver: zodResolver(LinkValidator),
    defaultValues: {
      url: "",
    },
  });

  const handleGenerateText = async (data: { url: string }) => {
    const prompt = data.url;
    setUrl(prompt);
    const { output } = await generate(prompt);

    for await (const delta of readStreamableValue(output)) {
      setGeneration((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

  // const handleDownloadFile = async (data: { url: string }) => {
  //   // await download(data).then(() => {
  //   //   console.log("downloaded");
  //   // });
  // };

  const doStuff = async () => {
    const streamableValue = await transcribe();
    for await (const message of readStreamableValue<string>(streamableValue)) {
      if (message) setTranscription(message);
    }
  };

  const videoId = getYouTubeID(url);
  const imgSrc = `https://i.ytimg.com/vi_webp/${videoId}/mqdefault.webp`;

  return (
    <ShineBorder
      className="p-10 text-2xl font-bold capitalize shadow-sm"
      color={"white"}
    >
      <div className="z-10">
        <div className=" mt-8 flex h-full w-full flex-col items-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => handleGenerateText(data))}
              className="space-y-8"
            >
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="youtube.com/watch?v=dQw4w9WgXcQ"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the YouTube link of the video
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"ghost"}
                  disabled={form?.watch("url") === ""}
                  className={cn(
                    "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                  )}
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-2 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    <span>✨ Generate</span>
                    <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </Button>
              </div>
            </form>
          </Form>
        </div>
        {videoId && (
          <Image alt="thumbnail" src={imgSrc} width={200} height={200} />
        )}
        <GeneratedContent generation={generation} />
      </div>
    </ShineBorder>
  );
};

export default ChatCompletion;
