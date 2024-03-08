interface Props extends React.PropsWithChildren {
  className?: string;
}

export default function Paragraph({ children, className }: Props) {
  return (
    <p
      className={`[&+&]:mt-[40px] text-[1.125rem] leading-[1.5] md:text-[1.25rem] font-normal ${className}`}
    >
      {children}
    </p>
  );
}
