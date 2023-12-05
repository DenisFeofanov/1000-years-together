import Header from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <Header title="Бессмертие" />
      {/* {children} */}
    </div>
  );
}
