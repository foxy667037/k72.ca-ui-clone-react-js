import * as MarqueeModule from "react-fast-marquee";

const MarqueeText = ({ speed = 180, play = true, children = null, className = "", direction = "left" }) => {
  const Marquee = MarqueeModule?.default?.default?.render;

  return (
    <>
      <div className={`w-full ${className}`}>
        <Marquee play={play} speed={speed} direction={direction}>
          {children}
        </Marquee>
      </div>
    </>
  );
};

export default MarqueeText;
