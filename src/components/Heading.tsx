interface Props {
  children: React.ReactNode;
}

function Heading({ children }: Props) {
  return (
    <h1
      className={`text-blackHeading text-[1.5rem] xsm:text-[2rem] tracking-[-1px] not-italic font-semibold leading-none md:text-[4rem] md:tracking-[-4.8px] md:max-w-[1370px] lg:text-[6rem]`}
    >
      {children}
    </h1>
  );
}

export default Heading;
