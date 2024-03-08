import Paragraph from "../Paragraph";

function IndentedParagraph({ children }: React.PropsWithChildren) {
  return <Paragraph className="rem:indent-[100px]">{children}</Paragraph>;
}

export default IndentedParagraph;
