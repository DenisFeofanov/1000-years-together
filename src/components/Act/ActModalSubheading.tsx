function ActModalSubheading({ children }: React.PropsWithChildren) {
  return (
    <h3 className="mt-[30px] text-blackHeading text-[1.5rem] not-italic font-bold leading-[normal] tracking-[-0.72px] lg:text-[2.25rem] lg:font-semibold lg:leading-[1.3] lg:tracking-[-0.36px]">
      {children}
    </h3>
  );
}

export default ActModalSubheading;
