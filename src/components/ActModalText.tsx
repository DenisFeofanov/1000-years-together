function ActModalText({ children }: React.PropsWithChildren) {
  return (
    <p className="text-blackText text-[1rem] not-italic font-normal leading-[1.5] lg:text-[1.125rem]">
      {children}
    </p>
  );
}

export default ActModalText;
