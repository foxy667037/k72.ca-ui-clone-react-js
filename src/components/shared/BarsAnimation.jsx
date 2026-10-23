import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router";
import { LogoComponent, LoadingBars } from "../index.js";

const BarsAnimation = ({ children }) => {
  const containerRef = useRef(null);
  const barParentRef = useRef(null);
  const appParentRef = useRef(null);

  const logoRef = useRef(null);
  const loadingBarsRef = useRef(null);

  const location = useLocation();

  useGSAP(
    () => {
      const bars = gsap.utils.toArray(".bars", containerRef.current);

      const tl = gsap.timeline();

      // --------------------------------
      // 1. Establish initial state
      // --------------------------------

      gsap.set(barParentRef.current, {
        display: "block",
        cursor: "wait",
      });

      gsap.set(bars, {
        yPercent: 0,
        height: "100%",
      });

      gsap.set([logoRef.current, loadingBarsRef.current], {
        opacity: 0,
      });

      gsap.set(appParentRef.current, {
        opacity: 0,
      });

      // --------------------------------
      // 2. Enter bars
      // --------------------------------

      tl.from(bars, {
        height: 0,
        stagger: {
          amount: -0.2,
        },
        duration: 0.6,
        ease: "power3.inOut",
      });

      // --------------------------------
      // 3. Show loading UI
      // --------------------------------

      tl.to([logoRef.current, loadingBarsRef.current], {
        opacity: 1,
        duration: 0.25,
      });

      // --------------------------------
      // 4. Hold
      // --------------------------------

      tl.to(
        {},
        {
          duration: 2,
        },
      );

      // --------------------------------
      // 5. Hide loading UI
      // --------------------------------

      tl.to([logoRef.current, loadingBarsRef.current], {
        opacity: 0,
        duration: 0.25,
      });

      // --------------------------------
      // 6. Move bars away
      // --------------------------------

      tl.to(bars, {
        yPercent: 100,
        stagger: {
          amount: -0.2,
        },
        duration: 0.6,
        ease: "power3.inOut",
      });

      // --------------------------------
      // 7. Hide overlay
      // --------------------------------

      tl.set(barParentRef.current, {
        display: "none",
        cursor: "auto",
      });

      // --------------------------------
      // 8. Reveal new page
      // --------------------------------

      tl.to(appParentRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
      });

      return () => {
        tl.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [location.pathname],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={containerRef}>
      {/* Bars Animation */}
      <div
        ref={barParentRef}
        className="h-screen w-full fixed top-0 left-0 z-50"
      >
        <div className="h-full w-full flex">
          <div className="bars h-full w-[22%] bg-black">
            <div ref={logoRef} className="w-full h-full p-2 opacity-0 bg-black">
              <LogoComponent SvgFillColor={"fill-white"}/>
            </div>
          </div>

          <div className="bars h-full w-[22%] bg-black" />

          <div className="bars h-full w-[22%] bg-black" />

          <div className="bars h-full w-[17%] bg-black" />

          <div className="bars h-full w-[17%] bg-black">
            <div
              ref={loadingBarsRef}
              className="w-full h-full p-2 flex justify-end items-end opacity-0"
            >
              <LoadingBars />
            </div>
          </div>
        </div>
      </div>

      {/* Application */}
      <div ref={appParentRef} className="h-screen w-full">
        {children}
      </div>
    </div>
  );
};

export default BarsAnimation;
