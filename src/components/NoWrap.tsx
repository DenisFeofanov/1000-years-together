function NoWrap({ children }: React.PropsWithChildren) {
  return <span className="break-keep whitespace-nowrap">{children}</span>;
}

export default NoWrap;
