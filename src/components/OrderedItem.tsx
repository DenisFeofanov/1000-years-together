interface Props extends React.PropsWithChildren {
  number: string;
}

function OrderedItem({ number, children }: Props) {
  return (
    <li className="[&+&]:mt-[0.63rem] flex items-start gap-[2rem] px-[1rem] py-[1.5rem] bg-[#f7f7f7] rounded-[24px] md:px-[1.5rem] md:py-[2rem]">
      <p className="w-[2.625rem] font-interTight font-semibold text-grayDark text-[4rem] tracking-[-0.24rem] leading-[1] md:text-[6rem] md:w-[4rem]">
        {number}
      </p>

      <p className="flex-1 font-normal text-blackText text-[1rem] leading-[1.5] md:text-[1.25rem]">
        {children}
      </p>
    </li>
  );
}

export default OrderedItem;
