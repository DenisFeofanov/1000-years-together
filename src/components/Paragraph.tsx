export default function Paragraph({ children }: React.PropsWithChildren) {
  return (
    <p className="[&+&]:mt-[40px] text-[1.125rem] leading-[27px] md:text-[1.25rem] font-normal md:leading-[30px]">
      {children}
    </p>
  );
}
