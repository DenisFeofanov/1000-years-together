import AppLink from "./AppLink";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <header className="py-[2px] px-[15px] flex justify-between items-center">
      <AppLink href="/about">О проекте</AppLink>

      <h2 className="text-blackHeading text-[1.125rem] font-medium tracking-[0.36px] uppercase">
        {title}
      </h2>

      <AppLink href="/tutorial">Инструкция</AppLink>
    </header>
  );
}
