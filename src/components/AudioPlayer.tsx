import { Story } from "@/interfaces/Story";
import { useRef } from "react";
import {
  default as H5AudioPlayer,
  default as Player,
  RHAP_UI,
} from "react-h5-audio-player";

function AudioPlayer({ audioSrc }: Pick<Story, "audioSrc">) {
  const audioRef = useRef<H5AudioPlayer>(null);

  return (
    <Player
      src={audioSrc}
      showJumpControls={false}
      layout="horizontal-reverse"
      autoPlayAfterSrcChange={false}
      customProgressBarSection={[
        RHAP_UI.CURRENT_TIME,
        <div key={1}>/</div>,
        RHAP_UI.DURATION,
        RHAP_UI.PROGRESS_BAR,
      ]}
      customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
      ref={audioRef}
    />
  );
}

export default AudioPlayer;
