import { FormData } from "@/interfaces/Form";
import { Path, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: Path<FormData>;
  register: UseFormRegister<FormData>;
  required: boolean;
  type: "text" | "email";
  placeholder: string;
};

const FeedbackInput = ({
  label,
  register,
  required,
  type,
  placeholder,
}: InputProps) => (
  <>
    <input
      className="py-[20px] h-[71px] text-grayDark text-[1.25rem] xsm:text-[1.5rem] not-italic font-semibold leading-[1.1] tracking-[0.24px] placeholder:text-grayMiddle placeholder:text-[1.75rem] placeholder:not-italic placeholder:font-semibold placeholder:leading-[1.1] placeholder:tracking-[-0.28px] border-b-2 border-b-grayMiddle"
      {...register(label, { required })}
      {...{ placeholder, type }}
    />
  </>
);

export default FeedbackInput;
