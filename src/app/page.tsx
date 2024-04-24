import Dropzone from "./components/dndarea";
import Dashboard from "./ui/dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12 items-center gap-3">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-lg font-bold">Dashboard de gastos</h1>
      </div>
      <div className="flex flex-col flex-center items-center">
        <Dashboard />
      </div>
    </main>
  );
}
