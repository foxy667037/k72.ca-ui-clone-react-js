const ImageComponent = ({ ImageSrc }) => {
  return (
    <div className="mb-3 h-18 w-48 shrink-0 overflow-hidden rounded-full">
      <img
        className="h-full w-full object-cover"
        src={ImageSrc}
        alt=""
      />
    </div>
  );
};

export default ImageComponent;