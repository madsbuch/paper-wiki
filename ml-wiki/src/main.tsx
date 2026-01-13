import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { AudioProvider } from "./contexts/AudioContext";
import AudioPlayer from "./components/AudioPlayer";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AudioProvider>
      <Routes />
      <AudioPlayer />
    </AudioProvider>
  </StrictMode>
);
