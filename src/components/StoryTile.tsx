import { Story } from "@/interfaces/Story";

interface Props {
  isSelected: boolean;
  isSelectingDone: boolean;
  handleClick: (story: Story) => void;
  story: Story;
}

function StoryTile({ isSelected, isSelectingDone, handleClick, story }: Props) {
  const selectedStoryStyles = isSelected && "border-black bg-gray-200";

  return (
    <button
      type="button"
      className={`flex justify-center items-center border-2 text-3xl lg:text-5xl ${selectedStoryStyles}`}
      key={story.title}
      onClick={() => handleClick(story)}
      disabled={!isSelected && isSelectingDone}
    >
      {story.title}
    </button>
  );
}

export default StoryTile;