interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 lg:p-32">
      {children}
    </div>
  );
}
