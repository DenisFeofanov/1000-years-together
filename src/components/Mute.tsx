interface Props {
  className: string;
}

export default function Mute({ className }: Props) {
  return (
    <button
      type="button"
      className={`uppercase text-blackText text-[1rem] font-semibold leading-[inherit] border-0 px-4 py-4 ${className}`}
    >
      <span className="text-grayReg">Звук:</span> ( вкл )
    </button>
  );
}
