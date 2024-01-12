import dynamic from "next/dynamic";
import Link from "next/link";
const KonvaWrapper = dynamic(() => import("../../components/KonvaWrapper"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="width-max height-max relative">
      <Link href={"/"} className="absolute top-10 right-10 w-24 h-24 z-10">
        <img
          src="https://camo.githubusercontent.com/e5539461134916a5775329fed8cb1c37032485d2b0cdc91dfba4e4c26c4fd5b3/68747470733a2f2f6b6f6e76616a732e6f72672f616e64726f69642d6368726f6d652d313932783139322e706e67"
          alt="pixi logo"
        />
      </Link>
      <KonvaWrapper />
    </div>
  );
}
