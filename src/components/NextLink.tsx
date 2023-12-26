interface Props {
  next: string | null;
  onNext: () => void;
}

function NextLink({ next, onNext }: Props) {
  return (
    <div className="text-right">
      <button className="text-right" onClick={onNext}>
        <p className="whitespace-pre font-mainHeading text-blackText text-[0.6875rem] not-italic font-semibold leading-[normal] tracking-[0.22px] uppercase lg:font-inter lg:text-[0.8125rem] lg:tracking-[0.26px]">
          далее
        </p>
        <p className="text-grayDark text-[1.5rem] font-bold leading-[1] tracking-[-0.24px] mt-[8px] lg:text-[1.875rem] lg:tracking-[-0.9px]">
          {next && next}
        </p>
      </button>
    </div>
  );
}

export default NextLink;
