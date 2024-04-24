"use client";

import Dropzone from "../components/dndarea";

export default function Dashboard() {
  return (
    <div>
      <Dropzone
        activeText="Pode soltar"
        inactiveText="Joge seus CSV do Nubank aqui"
      />
    </div>
  );
}
