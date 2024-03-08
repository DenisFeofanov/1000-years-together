import YouTube from "react-youtube";

function AnnotatedVideo({ url }: { url: string }) {
  return (
    <div className="rem:mt-[44px]">
      {/* define container with aspect ratio 16:9 and position the video absolutely for responsive width */}
      <div className="relative pb-[56.25%] h-0 rem:max-w-[1200px] mx-auto">
        <YouTube
          videoId={url}
          iframeClassName="absolute top-0 left-0 w-full h-full"
        />
      </div>

      <p className="rem:mt-[15px] text-blackText text-[0.875rem] md:hidden">
        Смотреть на Youtube
      </p>
    </div>
  );
}

export default AnnotatedVideo;
