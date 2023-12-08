import Image from "next/image";
import Link from "next/link";

function LinkHome() {
  return (
    <Link
      href="/"
      className="hidden md:block md:fixed md:bottom-0 md:left-0 md:px-[18px] md:py-[13px]"
    >
      <Image src="/biennial.svg" width="24" height="24" alt="Biennial logo" />
    </Link>
  );
}

export default LinkHome;
