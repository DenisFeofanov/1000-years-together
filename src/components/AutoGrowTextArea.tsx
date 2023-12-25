// textarea that auto grows adjusting for value
// https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/

import { FormData } from "@/interfaces/Form";
import { ChangeEvent, forwardRef, useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface Props {
  label: Path<FormData>;
  placeholder: string;
}

const AutoGrowTextArea = forwardRef<
  HTMLTextAreaElement,
  Props & ReturnType<UseFormRegister<FormData>>
>(function AutoGrowTextArea(
  { label, placeholder, onBlur, onChange, name },
  ref
) {
  const [value, setValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    onChange(e);
  }

  const inputStyles =
    "py-[20px] min-h-[71px] text-grayDark text-[1.25rem] xsm:text-[1.25rem] not-italic font-semibold leading-[1.1] tracking-[0.24px] placeholder:text-grayMiddle placeholder:text-[1.75rem] placeholder:not-italic placeholder:font-semibold placeholder:leading-[1.1] placeholder:tracking-[-0.28px] border-b-2 border-b-grayMiddle md:min-h-[87px] md:placeholder:text-[2.25rem] md:placeholder:leading-[1.3] md:placeholder:tracking-[-0.0225rem] md:text-[1.5rem] md:leading-[1.3] md:tracking-[-0.0225rem] focus:border-grayDark";

  return (
    <div className="grid">
      <span
        className={`row-start-1 col-start-1 row-end-2 col-end-2 whitespace-pre-wrap invisible ${inputStyles}`}
      >
        {value}
      </span>

      <textarea
        className={`resize-none overflow-hidden row-start-1 col-start-1 row-end-2 col-end-2 ${inputStyles}`}
        onChange={handleChange}
        {...{ ref, onBlur, name, placeholder }}
      >
        {value}
      </textarea>
    </div>
  );
});

export default AutoGrowTextArea;
