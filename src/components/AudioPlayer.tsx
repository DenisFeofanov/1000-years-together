import { forwardRef } from "react";
import {
  default as H5AudioPlayer,
  default as Player,
  RHAP_UI,
} from "react-h5-audio-player";
import ClientOnly from "./ClientOnly";

interface Props {
  audioSrc: string | undefined;
  onEnded: () => void;
  onLoadedMetadata: () => void;
  onCanPlay: () => void;
}

const AudioPlayer = forwardRef<H5AudioPlayer, Props>(function AudioPlayer(
  { audioSrc, onEnded, onCanPlay, onLoadedMetadata },
  ref
) {
  return (
    <>
      <ClientOnly>
        <Player
          src={audioSrc}
          showJumpControls={false}
          layout="horizontal-reverse"
          autoPlayAfterSrcChange={false}
          customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
          customControlsSection={[]}
          onLoadedMetaData={onLoadedMetadata}
          {...{ ref, onCanPlay, onEnded }}
        />
      </ClientOnly>
      <style jsx>{`
        :global(.rhap_controls-section) {
          display: none;
        }

        :global(.rhap_container) {
          padding: 0;
          box-shadow: none;
        }

        :global(.rhap_container) {
          padding: 0;
          box-shadow: none;
        }

        :global(.rhap_progress-container) {
          margin: 0;
        }

        :global(.rhap_progress-indicator) {
          opacity: 0;
        }

        :global(.rhap_progress-bar) {
          height: 7px;
          background-color: #f1f1f1;
        }

        :global(.rhap_progress-filled) {
          background-color: #212626;
        }
      `}</style>
    </>
  );
});

export default AudioPlayer;
