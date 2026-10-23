import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImageChanger = ({ className = "" }) => {
  const imageRef = useRef(null);
  const imageDivRef = useRef(null);
  const currentIndex = useRef(0);

  const imageArray = [
    "https://k72.ca/images/teamMembers/Carl_480x640.jpg?w=480&h=640&fit=crop&s=f0a84706bc91a6f505e8ad35f520f0b7",
    "https://k72.ca/images/teamMembers/CAMILLE_640X960_2.jpg?w=640&h=960&s=28b4a95be0b5d4f2d698c8a63de0c8df",
    "https://k72.ca/images/teamMembers/Olivier_480x640.jpg?w=480&h=640&fit=crop&s=c13569c0753117d04f1a93cf7b446d64",
    "https://k72.ca/images/teamMembers/ChantalG_480x640.jpg?w=480&h=640&fit=crop&s=13093769c4a19cecd291ddcccd898991",
    "https://k72.ca/images/teamMembers/Michele_480X640.jpg?w=480&h=640&fit=crop&s=ce85dc6d140947736baa739d0e59dab2",
    "https://k72.ca/images/teamMembers/MEL_480X640.jpg?w=480&h=640&fit=crop&s=07c9bfee89816720b873e6748a276af6",
    "https://k72.ca/images/teamMembers/MEGGIE_480X640_2.jpg?w=480&h=640&fit=crop&s=3604b19f8fc7b40f517954147698d847",
    "https://k72.ca/images/teamMembers/joel_480X640_3.jpg?w=480&h=640&fit=crop&s=1cadbf143b3aa916b1b414464acbb4d6",
  ];

  useGSAP(() => {
    // Preload images
    const preloadedImages = imageArray.map((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
      return img;
    });

    // Show first image
    imageRef.current.src = preloadedImages[0].src;

    const trigger = ScrollTrigger.create({
      trigger: imageDivRef.current,
      start: "top 22%",
      end: "top -201.5%",
      pin: true,
      scrub: 0.7,

      onUpdate: (self) => {
        const imageIndex = Math.ceil(self.progress * imageArray.length) - 1;

        // change image when index changes
        if (imageIndex !== currentIndex.current) {
          currentIndex.current = imageIndex;
          imageRef.current.src = preloadedImages[imageIndex].src;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  });

  return (
    <div
      ref={imageDivRef}
      className={`absolute h-64 w-48 overflow-hidden rounded-[20px] ${className}`}
    >
      <img ref={imageRef} className="h-full w-full object-cover" alt="image" />
    </div>
  );
};

export default ImageChanger;
