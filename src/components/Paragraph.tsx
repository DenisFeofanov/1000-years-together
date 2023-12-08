export default function Paragraph({ children }: React.PropsWithChildren) {
  return (
    <p className="[&+&]:mt-[40px] text-[1.125rem] leading-[1.5] md:text-[1.25rem] font-normal">
      {children}
    </p>
  );
}
