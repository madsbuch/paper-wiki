import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";

interface AudioContextType {
  currentAudio: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playAudio: (audioPath: string, title: string) => void;
  pauseAudio: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  currentTitle: string | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1.0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = (audioPath: string, title: string) => {
    if (!audioRef.current) return;

    // If playing a different audio, stop current and load new one
    if (currentAudio !== audioPath) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentAudio(audioPath);
      setCurrentTitle(title);
      audioRef.current.src = audioPath;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // Same audio - just toggle play/pause
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentAudio,
        isPlaying,
        currentTime,
        duration,
        volume,
        playAudio,
        pauseAudio,
        seekTo,
        setVolume,
        currentTitle,
        audioRef,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />
    </AudioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
