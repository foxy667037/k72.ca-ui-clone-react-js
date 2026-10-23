import {
  VideoComponent,
  UpperHeading,
  MiddleParagraph,
  BottomLinks,
  ClockComponent,
} from "../components";

const HomePage = () => {
  return (
    <>
      <div className="fixed inset-0 h-screen w-screen">
        <VideoComponent />
      </div>

      <main className="relative w-full p-2 text-white">
        <UpperHeading />
        <MiddleParagraph />
        <BottomLinks />
        <div className="absolute bottom-0 left-0 p-2 text-white">
          <ClockComponent />
        </div>
      </main>
    </>
  );
};

export default HomePage;
