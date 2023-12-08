interface Props {
  children: React.ReactNode;
}

function Heading({ children }: Props) {
  return (
    <h1
      className={`text-blackHeading text-[2rem] tracking-[-1px] not-italic font-semibold leading-none md:text-[6rem] md:tracking-[-4.8px]`}
    >
      {children}
    </h1>
  );
}

export default Heading;
