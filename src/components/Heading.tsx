interface Props {
  children: React.ReactNode;
}

function Heading({ children }: Props) {
  return <h1 className="m-4 text-3xl text-red-800">{children}</h1>;
}

export default Heading;
