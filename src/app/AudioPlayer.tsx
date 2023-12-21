import pauseIcon from "@/Pause.svg";
import playIcon from "@/Play.svg";
import Image from "next/image";
import { forwardRef } from "react";
import {
  default as H5AudioPlayer,
  default as Player,
  RHAP_UI,
} from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ClientOnly from "@/components/ClientOnly";
import "./AudioPlayer.css";

interface Props {
  audioSrc: string | undefined;
  onEnded?: () => void;
  onLoadedMetadata?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  time: React.ReactElement;
}

const AudioPlayer = forwardRef<H5AudioPlayer, Props>(function AudioPlayer(
  { audioSrc, onLoadedMetadata, time, onPlay, onPause, onEnded },
  ref
) {
  const playElem = (
    <Image src={playIcon} className="w-full" alt="play icon" priority />
  );
  const pauseElem = (
    <Image src={pauseIcon} className="w-full" alt="pause icon" priority />
  );

  return (
    <>
      <ClientOnly>
        <Player
          src={audioSrc}
          showJumpControls={false}
          layout="stacked-reverse"
          autoPlayAfterSrcChange={false}
          customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
          customControlsSection={[time, RHAP_UI.MAIN_CONTROLS]}
          onLoadedMetaData={onLoadedMetadata}
          customIcons={{
            play: playElem,
            pause: pauseElem,
          }}
          {...{ ref, onEnded, onPlay, onPause }}
        />
      </ClientOnly>
    </>
  );
});

export default AudioPlayer;
