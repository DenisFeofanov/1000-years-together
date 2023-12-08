interface Props {
  role: string;
  name: string;
}

function CreatorName({ role, name }: Props) {
  return (
    <>
      <p className="[p+&]:mt-[30px] md:[p+&]:mt-0 text-[1.25rem] text-blackText not-italic font-normal leading-[1.5]">
        {role}
      </p>
      <p className="mt-[5px] text-grayDark text-[1.25rem] font-medium not-italic leading-[1.5] tracking-[-0.2px] whitespace-pre-wrap md:mt-0">
        {name}
      </p>
    </>
  );
}

export default CreatorName;
