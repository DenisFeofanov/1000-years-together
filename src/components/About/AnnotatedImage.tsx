import Image, { StaticImageData } from "next/image";

interface Props {
  image: StaticImageData;
  imageAlt: string;
  anotherAnnotation?: string;
  annotation?: string;
  className?: string;
  isHiddenOnMobile?: boolean;
}

function AnnotatedImage({
  image,
  imageAlt,
  annotation,
  className = "",
  isHiddenOnMobile: isHidden = false,
  anotherAnnotation,
}: Props) {
  const hiddenOnMobileStyles = isHidden ? "hidden lg:inline-block" : "";
  return (
    <div className={`${hiddenOnMobileStyles}`}>
      <Image className={`rounded-md ${className}`} src={image} alt={imageAlt} />
      {anotherAnnotation && (
        <p className="rem:lg:mt-[20px] rem:lg:mb-[16px] text-blackText text-[1.125rem]">
          {anotherAnnotation}
        </p>
      )}
      {annotation && (
        <p className="text-[0.875rem] text-blackText rem:mt-[15px] md:text-[1rem]">
          {annotation}
        </p>
      )}
    </div>
  );
}

export default AnnotatedImage;
