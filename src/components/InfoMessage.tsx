function InfoMessage({ children }: React.PropsWithChildren) {
  return (
    <p className="text-center text-blackHeading text-[2rem] not-italic font-semibold leading-[1] tracking-[-0.96px] md:text-[6rem] md:tracking-[-0.3rem]">
      {children}
    </p>
  );
}

export default InfoMessage;
