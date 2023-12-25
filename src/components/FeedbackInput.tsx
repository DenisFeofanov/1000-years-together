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
      className="h-[71px] text-grayDark text-[1.25rem] xsm:text-[1.5rem] not-italic font-semibold leading-[1.1] tracking-[0.24px] placeholder:text-grayMiddle placeholder:text-[1.75rem] placeholder:not-italic placeholder:font-semibold placeholder:leading-[1.1] placeholder:tracking-[-0.28px] border-b-2 border-b-grayMiddle md:h-[87px] md:placeholder:text-[2.25rem] md:placeholder:leading-[1.3] md:placeholder:tracking-[-0.0225rem] md:text-[2.25rem] md:leading-[1.3] md:tracking-[-0.0225rem] focus:border-grayDark"
      {...register(label, { required })}
      {...{ placeholder, type }}
    />
  </>
);

export default FeedbackInput;
