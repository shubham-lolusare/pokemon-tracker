// this component will be loaded when the page is loading or network requests are done
// importing loading icon
import pokeball from "../../assets/pokeball.svg";

export default function LoadingPage() {
  return (
    <main className="fixed top-0 left-0 h-screen w-screen flex flex-col gap-2 justify-center items-center backdrop-blur-sm bg-black/90 z-[1000000]">
      {/* pokeball icon */}
      <div className="w-[100px] h-[100px]">
        <img src={pokeball} className="animate-loading" />
      </div>

      <h1 className="text-white text-center text-xl xs:text-base">
        Loading...
      </h1>
    </main>
  );
}
