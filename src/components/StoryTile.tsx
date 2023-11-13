import { Story } from "@/interfaces/Story";

interface Props {
  isSelected: boolean;
  isSelectingDone: boolean;
  onTileClick: () => void;
  title: string;
}

function StoryTile({ isSelected, isSelectingDone, onTileClick, title }: Props) {
  const selectedStoryStyles = isSelected && "border-black bg-gray-200";

  return (
    <button
      type="button"
      className={`flex justify-center items-center border-2 text-3xl lg:text-5xl ${selectedStoryStyles}`}
      onClick={onTileClick}
      disabled={!isSelected && isSelectingDone}
    >
      {title}
    </button>
  );
}

export default StoryTile;
