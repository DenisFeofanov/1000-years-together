import DOMPurify from "isomorphic-dompurify";

function ModalText({ htmlText: text }: { htmlText: string }) {
  const markup = { __html: DOMPurify.sanitize(text) };

  return (
    <div
      className="mt-[1.87rem] mb-[0.63rem] text-blackText text-[1rem] not-italic font-normal leading-[1.5] lg:text-[1.125rem]"
      dangerouslySetInnerHTML={markup}
    ></div>
  );
}

export default ModalText;