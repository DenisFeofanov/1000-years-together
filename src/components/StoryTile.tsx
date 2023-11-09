import { Story } from "@/interfaces/Story";

interface Props {
  isSelected: boolean;
  isSelectingDone: boolean;
  addSelectedStory: (story: Story) => void;
  story: Story;
}

function StoryTile({
  isSelected,
  isSelectingDone,
  addSelectedStory,
  story,
}: Props) {
  const selectedStoryStyles =
    isSelected && "border-black bg-gray-200 pointer-events-none";

  const disabledStyles = isSelectingDone && `pointer-events-none`;

  return (
    <button
      type="button"
      className={`flex justify-center items-center border-2 text-3xl lg:text-5xl ${selectedStoryStyles} ${disabledStyles}`}
      key={story.title}
      onClick={() => addSelectedStory(story)}
      disabled={isSelected || isSelectingDone}
    >
      {story.title}
    </button>
  );
}

export default StoryTile;
