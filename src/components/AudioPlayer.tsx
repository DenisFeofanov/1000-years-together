import { forwardRef } from "react";
import {
  default as H5AudioPlayer,
  default as Player,
  RHAP_UI,
} from "react-h5-audio-player";

interface Props {
  audioSrc: string;
  onCanPlay: () => void;
}

const AudioPlayer = forwardRef<H5AudioPlayer, Props>(function AudioPlayer(
  { audioSrc, onCanPlay },
  ref
) {
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
      ref={ref}
      onCanPlay={onCanPlay}
    />
  );
});

export default AudioPlayer;
