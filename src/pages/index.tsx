"use client"

import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
const PixiWrapper = dynamic(() => import("../components/PixiWrapper"), {
  ssr: false,
}); 
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <PixiWrapper />
  );
}
