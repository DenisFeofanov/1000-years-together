interface Props extends React.PropsWithChildren {
  onClick: () => void;
}

function ActButton({ children, onClick }: Props) {
  return (
    <button
      className={`inline-flex transition-all after:transition-all before:transition-all before:translate-x-[-3px] after:translate-x-[3px] max-w-max leading-[normal] py-1 text-grayDark text-[0.75rem] xsm:text-[0.9375rem] font-semibold border-2 rounded-full border-transparent uppercase gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full active:before:opacity-0 active:after:opacity-0 lg:text-[1.125rem]`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ActButton;
