import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { AudioProvider } from "./contexts/AudioContext";
import { DatabaseProvider } from "./hooks/useDatabase";
import AudioPlayer from "./components/AudioPlayer";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DatabaseProvider>
      <AudioProvider>
        <Routes />
        <AudioPlayer />
      </AudioProvider>
    </DatabaseProvider>
  </StrictMode>
);
