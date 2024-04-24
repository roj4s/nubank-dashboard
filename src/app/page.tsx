import Dropzone from "./components/dndarea";
import Dashboard from "./ui/dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 items-center">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-lg font-bold">Dashboard de gastos</h1>
      </div>
      <div className="w-full flex flex-col items-center">
        <Dashboard />
      </div>
    </main>
  );
}
