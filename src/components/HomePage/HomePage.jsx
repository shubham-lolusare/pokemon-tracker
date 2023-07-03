// importing link from react router
import { Link, useNavigation } from "react-router-dom";

// importing various a=images according to the isze of the device
import desktopBG from "../../assets/desktopModeWallpaper.jpeg";
import mobileBG from "../../assets/mobileModeWallpaper.jpg";
import tabletBG from "../../assets/tabletModeWallpaper.jpg";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function HomePage() {
  let navigation = useNavigation();

  return (
    <main className="relative h-screen w-screen">
      {/* this component will display the image according to the device width */}
      <div className="absolute left-0 top-0 w-full h-full z-[-1]">
        <picture>
          {/* for mobiles */}
          <source
            media="(max-width: 520px)"
            srcSet={mobileBG}
            className="w-full h-full"
          />
          {/* for tablets */}
          <source
            media="(max-width: 912px)"
            srcSet={tabletBG}
            className="w-full h-full"
          />
          {/* default for desktops */}
          <img src={desktopBG} className="w-full h-full" />
        </picture>
      </div>

      <div className="sm:bg-black/50 p-4 h-full w-1/2 z-[101] flex flex-col justify-center text-white sm:w-full sm:items-center sm:gap-4 mobile:gap-2 xs:gap-1">
        <h1 className="text-[6vw] font-semibold sm:text-8xl mobile:text-5xl sm:text-center xs:text-4xl">
          Welcome Ash,
        </h1>
        <p className="text-[4vw] mb-2 sm:text-6xl mobile:text-3xl sm:text-center xs:text-2xl">
          Let&apos;s get started
        </p>
        {/* link to navigate to dashboard */}
        <Link
          to="/dashboard"
          className="w-max p-2 pl-8 pr-8 rounded-lg bg-black/70 hover:bg-yellow-500/70 hover:text-black hover:font-bold sm:text-2xl mobile:text-base xs:text-sm xs:pl-4 xs:pr-4"
        >
          Go to Dashboard
        </Link>
      </div>

      {navigation.state === "loading" && <LoadingPage />}
    </main>
  );
}
