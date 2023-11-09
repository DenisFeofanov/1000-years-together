import { Story } from "@/interfaces/Story";
import { useEffect, useRef, useState } from "react";

interface Props extends Story {
  isDisabled?: boolean;
}

function StoryPlayer({ audioSrc, title, isDisabled = false }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc); // define ref here (on client), otherwise it will be called on server. Audio API doesn't work on server
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else throw new Error("reference for audio is empty");
  }, [isPlaying]);

  function handleClick() {
    if (isDisabled) {
      return;
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex gap-3 m-3 p-1 border hover:border-black  ${
        isDisabled ? "text-gray-300" : "text-black"
      }`}
    >
      <h3>{title}</h3>
      {isPlaying ? "Пауза" : "Слушать"}
    </button>
  );
}

export default StoryPlayer;
