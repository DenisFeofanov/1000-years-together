export default function SubHeading({ children }: React.PropsWithChildren) {
  return (
    <h3 className="text-[1.75rem] font-semibold leading-[1.1] text-blackText not-italic tracking-[-0.0175rem]">
      {children}
    </h3>
  );
}
