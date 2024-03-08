interface Props extends React.PropsWithChildren {
  className?: string;
}

function Container({ children, className }: Props) {
  return <div className={`px-4 ${className}`}>{children}</div>;
}

export default Container;
