import VideoComponent from "./VideoComponent";

const UpperHeading = () => {
  return (
    <h1 className="text-white text-[9.5vw] leading-28.5 uppercase text-center font-[Lausanne-300]">
      <div>L'étincelle</div>

      <div className="flex justify-center items-center">
        <span>qui</span>
        <div className="w-50 h-21 -mt-3 rounded-full overflow-hidden">
          <VideoComponent />
        </div>
        <span>génère</span>
      </div>

      <div className="flex gap-5 justify-center items-center -mt-2">
        la
        <span>créativité</span>
      </div>
    </h1>
  );
};

export default UpperHeading;
