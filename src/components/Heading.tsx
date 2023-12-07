import { RFDewi } from "@/pages/fonts";

interface Props {
  children: React.ReactNode;
}

function Heading({ children }: Props) {
  return (
    <h1
      className={`${RFDewi.className} text-blackHeading text-[2.75rem] leading-[0.9] tracking-[-0.0825rem] uppercase`}
    >
      {children}
    </h1>
  );
}

export default Heading;
