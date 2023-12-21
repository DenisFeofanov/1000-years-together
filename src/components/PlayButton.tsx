import Image from "next/image";
import PauseIcon from "@/Pause.svg";
import PlayIcon from "@/Play.svg";

interface Props {
  onClick: () => void;
  isCanPlay: boolean;
  isPlaying: boolean;
}

function PlayButton({ onClick, isCanPlay, isPlaying }: Props) {
  return (
    <button
      className="block mt-[82px] mx-auto  disabled:opacity-50"
      type="button"
      onClick={onClick}
      disabled={!isCanPlay}
    >
      <Image
        className="h-[144px] lg:h-[196px]"
        src={isPlaying ? PauseIcon : PlayIcon}
        alt="Play icon"
        priority
      />
    </button>
  );
}

export default PlayButton;
