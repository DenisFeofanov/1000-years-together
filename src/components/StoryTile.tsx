interface Props {
  isSelected?: boolean;
  isSelectingDone?: boolean;
  onTileClick?: () => void;
  index: number;
  duration: string;
}

function StoryTile({
  isSelected,
  isSelectingDone,
  onTileClick,
  index,
  duration,
}: Props) {
  return (
    <button
      type="button"
      className={`w-full h-full relative py-[20px] px-[10px] group md:py-[35px]`}
      onClick={onTileClick}
      disabled={!isSelected && isSelectingDone}
    >
      <div className={`flex flex-col justify-center items-center`}>
        <span
          className={`text-grayNum text-[4.75rem] md:text-[5.25rem] not-italic font-medium leading-[1] tracking-[-4.56px] ml-[-4.56px] lg:text-[9rem] lg:tracking-[-11.52px] lg:ml-[-11.52px] ${
            isSelected
              ? "text-white"
              : "group-hover:group-enabled:fine-pointer:text-grayDark"
          } `}
        >
          {index}
        </span>
        <span
          className={`text-grayDark text-[1.125rem] not-italic font-medium leading-[normal] tracking-[-0.18px]  ${
            isSelected
              ? "text-white"
              : "group-hover:group-enabled:fine-pointer:text-grayDark"
          } `}
        >
          {duration}
        </span>
      </div>

      <div
        className={`absolute top-[10px] bottom-[10px] left-[10px] right-[10px] -z-10 rounded-full ${
          isSelected
            ? "selected-btn-gradient"
            : "group-hover:group-enabled:fine-pointer:hover-btn-gradient"
        }`}
      ></div>
    </button>
  );
}

export default StoryTile;
