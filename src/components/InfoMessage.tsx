function InfoMessage({ children }: React.PropsWithChildren) {
  return (
    <p className="text-blackHeading text-[2rem] not-italic font-semibold leading-[1] tracking-[-0.96px]">
      {children}
    </p>
  );
}

export default InfoMessage;
