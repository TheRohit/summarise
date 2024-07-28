import ChatCompletion from "~/components/home/ChatCompletion";

export default async function HomePage() {
  return (
    <main className=" flex flex-col items-center justify-center  gap-9 overflow-hidden p-10   ">
      <ChatCompletion />
    </main>
  );
}
