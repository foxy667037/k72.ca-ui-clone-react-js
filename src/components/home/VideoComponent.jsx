import Video from "../../assets/video/Accueil.mp4";

const VideoComponent = () => {
  return (
    <div className="w-full h-full">
      <video
        autoPlay
        muted
        loop
        className="h-full w-full object-cover"
        src={Video}
      />
    </div>
  );
};

export default VideoComponent;
