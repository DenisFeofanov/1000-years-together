function ActModalText({ children }: React.PropsWithChildren) {
  return (
    <p className="text-blackText text-[1rem] not-italic font-normal leading-[1.5]">
      {children}
    </p>
  );
}

export default ActModalText;
