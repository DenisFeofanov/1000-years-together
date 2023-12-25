// textarea that auto grows adjusting for value
// https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/

import { FormData } from "@/interfaces/Form";
import { ChangeEvent, forwardRef, useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface Props {
  className?: string;
  label: Path<FormData>;
  placeholder: string;
}

const AutoGrowTextArea = forwardRef<
  HTMLTextAreaElement,
  Props & ReturnType<UseFormRegister<FormData>>
>(function AutoGrowTextArea(
  { className, label, placeholder, onBlur, onChange, name },
  ref
) {
  const [value, setValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    onChange(e);
  }

  return (
    <div className="grid">
      <span className="row-start-1 col-start-1 row-end-2 col-end-2 whitespace-pre-wrap invisible">
        {value}
      </span>
      <textarea
        className={`resize-none overflow-hidden row-start-1 col-start-1 row-end-2 col-end-2 ${className}`}
        onChange={handleChange}
        {...{ ref, onBlur, name, placeholder }}
      >
        {value}
      </textarea>
    </div>
  );
});

export default AutoGrowTextArea;
