import { Story } from "@/interfaces/Story";
import { useEffect, useRef, useState } from "react";

interface Props extends Story {
  handleSelect: (title: string) => void;
  isDisabled: boolean;
  isAnyStorySelected: boolean;
}

function StoryPlayer({
  audioSrc,
  title,
  handleSelect,
  isDisabled,
  isAnyStorySelected,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc); // define ref here (on client), otherwise it will be called on server. Audio API doesn't work on server
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
      handleSelect(title);
      return;
    }
    setIsPlaying(!isPlaying);
  }

  const stylesAfterSelection =
    isAnyStorySelected && isDisabled && "cursor-default hover:border-inherit";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex gap-3 m-3 p-1 border hover:border-black  ${
        isDisabled ? "text-gray-300" : "text-black"
      } ${stylesAfterSelection}`}
    >
      <h3>{title}</h3>
      {isPlaying ? "Пауза" : "Слушать"}
    </button>
  );
}

export default StoryPlayer;
