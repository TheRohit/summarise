import { Suspense } from "react";
import ChatCompletion from "~/components/home/ChatCompletion";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-black">
      <Suspense>
        <ChatCompletion />
      </Suspense>
    </main>
  );
}
