interface Props extends React.PropsWithChildren {
  number: string;
}

function OrderedItem({ number, children }: Props) {
  return (
    <li className="[&+&]:mt-[0.63rem] flex items-start gap-[2rem] px-[1rem] py-[1.5rem] bg-[#f7f7f7] rounded-[24px]">
      <p className="w-[2.625rem] font-interTight font-semibold text-grayDark text-[4rem] tracking-[-0.24rem] leading-[1]">
        {number}
      </p>

      <p className="flex-1 font-normal text-blackText text-[1rem] leading-[1.5]">
        {children}
      </p>
    </li>
  );
}

export default OrderedItem;
