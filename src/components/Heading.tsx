interface Props {
  children: React.ReactNode;
}

function Heading({ children }: Props) {
  return (
    <h1
      className={`text-blackHeading text-[3rem] tracking-[-2px] md:text-[6rem] not-italic font-semibold leading-none md:tracking-[-4.8px]`}
    >
      {children}
    </h1>
  );
}

export default Heading;
