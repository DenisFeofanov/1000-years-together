import Image, { StaticImageData } from "next/image";

interface Props {
  image: StaticImageData;
  imageAlt: string;
  annotation?: string;
}

function AnnotatedImage({ image, imageAlt, annotation }: Props) {
  return (
    <>
      <Image className="rounded-md" src={image} alt={imageAlt} />
      {annotation && (
        <p className="text-[0.875rem] text-blackText rem:mt-[15px]">
          {annotation}
        </p>
      )}
    </>
  );
}

export default AnnotatedImage;
