import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
const PixiWrapper = dynamic(() => import("../components/PixiWrapper"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="width-max height-max relative">
      <Link href={"/konva"} className="absolute top-10 right-10 w-24 h-12 z-10">
        <img
          src="https://pixijs.com/images/logo.svg"
          alt="pixi logo"
        />
      </Link>
      <PixiWrapper />
    </div>
  );
}
