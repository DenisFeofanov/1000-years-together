import { Story } from "@/interfaces/Story";
import { useRef, useState, useEffect } from "react";

function Story({ audioSrc, title }: Story) {
  const audioRef = useRef(null as any);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc); // only call client
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function handleClick() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex gap-3 m-3 p-1 border">
      <h3>{title}</h3>
      <button type="button" onClick={handleClick}>
        {isPlaying ? "Пауза" : "Слушать"}
      </button>
    </div>
  );
}

export default Story;
