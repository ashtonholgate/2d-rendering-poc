"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
const PixiWrapper = dynamic(() => import("../components/PixiWrapper"), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="width-max height-max relative">
      <Image src="https://pixijs.com/images/logo.svg" alt="pixi logo" className="absolute top-10 right-10" width={100} height={50}/>
      <PixiWrapper />
    </div>
  );
}
