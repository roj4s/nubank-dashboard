import Dropzone from "./components/dndarea";
import Dashboard from "./ui/dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 items-center gap-6">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-xl font-bold">Dashboard de gastos Nubank</h1>
        <h2 className="text-sm">
          Uma visualizacao melhor detalhada da sua fatura Nubank
        </h2>
      </div>
      <div className="w-full flex flex-col h-screen">
        <Dashboard />
      </div>
    </main>
  );
}
