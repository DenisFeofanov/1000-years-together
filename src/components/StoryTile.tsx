interface Props {
  isSelected: boolean;
  isSelectingDone: boolean;
  onTileClick: () => void;
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
      className={`py-[20px] px-[10px] group`}
      onClick={onTileClick}
      disabled={!isSelected && isSelectingDone}
    >
      <div className={`relative flex flex-col justify-center items-center`}>
        <span
          className={`text-grayNum text-[4.75rem] not-italic font-medium leading-[1] tracking-[-4.56px] ${
            isSelected
              ? "text-white"
              : "group-hover:group-enabled:fine-pointer:text-grayDark"
          } `}
        >
          {index}
        </span>
        <span
          className={`text-grayDark text-[1.125rem] not-italic font-medium leading-[normal] tracking-[-0.18px] ${
            isSelected
              ? "text-white"
              : "group-hover:group-enabled:fine-pointer:text-grayDark"
          } `}
        >
          {duration}
        </span>

        <div
          className={`absolute top-0 bottom-0 left-0 right-0 -z-10 rounded-full max-w-[130px] ${
            isSelected
              ? "selected-btn-gradient"
              : "group-hover:group-enabled:fine-pointer:hover-btn-gradient"
          }`}
        ></div>
      </div>
    </button>
  );
}

export default StoryTile;
