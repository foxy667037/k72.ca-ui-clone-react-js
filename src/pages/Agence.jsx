import gsap from "gsap";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  AgenceTable,
  ImageChanger,
  MainHeading,
  MarqueeText,
  ParagraphText,
} from "../components";
import useNavbarMenu from "../context/navbarMenu/useNavbarMenu";

gsap.registerPlugin(ScrollTrigger);

const Agence = () => {
  // =======================
  //        dom ref
  // =======================
  const agenceTableSecRef = useRef(null);

  const picPanelContainer = useRef(null);

  const picPanelScreen1 = useRef(null);
  const picPanelScreen2 = useRef(null);

  const picPanel1Marquee1 = useRef(null);
  const picPanel1Marquee2 = useRef(null);

  const picPanel2Marquee1 = useRef(null);
  const picPanel2Marquee2 = useRef(null);

  const { navbarMenuIsOpened } = useNavbarMenu()


  // =======================
  //        lenis code
  // =======================
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 2 })

    if (navbarMenuIsOpened) return lenis.stop();

    let rafId = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      rafId = requestAnimationFrame(raf)
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [navbarMenuIsOpened])


  // =======================
  //        gsap code
  // =======================
  useGSAP(() => {
    gsap.to("body", {
      backgroundColor: "#000000",
      color: "#ffffff",
      duration: 0.4,
      ease: "power2.inOut",

      scrollTrigger: {
        trigger: agenceTableSecRef.current,
        start: "96% top",
        end: "100% top",
        toggleActions: "play none play reverse", // onEnter onLeave onEnterBack onLeaveback
      },
    });


    gsap.set(picPanelScreen2.current, {
      yPercent: 100,
    })
    gsap.set([picPanel1Marquee1.current, picPanel1Marquee2.current], {
      yPercent: 0
    })

    gsap.to([picPanel1Marquee1.current, picPanel1Marquee2.current], {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",

      scrollTrigger: {
        trigger: picPanelContainer.current,
        start: "-65% top",
        end: "60% 30%",
        toggleActions: "play reverse play reverse",
      },
    });
    gsap.to([picPanel1Marquee1.current, picPanel1Marquee2.current], {
      yPercent: -200,
      ease: "power1",

      scrollTrigger: {
        trigger: picPanelContainer.current,
        start: "top top",
        scrub: 0.8,
      }
    })
    gsap.to(picPanelScreen2.current, {
      yPercent: 0,
      ease: "power1",

      scrollTrigger: {
        trigger: picPanelContainer.current,
        start: "top top",
        end: "=+100%",
        pin: true,
        scrub: 0.8,
      }
    })
    gsap.to([picPanel2Marquee1.current, picPanel2Marquee2.current], {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",

      scrollTrigger: {
        trigger: picPanelScreen2.current,
        start: "top 60%",
        toggleActions: "play reverse play reverse"
      }
    })
  });


  return (
    <>
      <main className="h-screen pt-[56vh] transition-all">
        <section className="h-auto w-full pb-40 relative box-border overflow-x-hidden">
          <ImageChanger className={"-z-10 top-[-34vh] left-[30.5vw]"} />
          <div>
            <MainHeading />
            <ParagraphText />
          </div>
        </section>

        <section ref={agenceTableSecRef} className="flex font-[Lausanne-500] px-[10.75%] flex-col h-auto pt-10 font-medium text-[1.25em] mb-40">
          <AgenceTable />
        </section>

        <section className="relative w-full h-auto">
          <div ref={picPanelContainer} className="pictureContainer h-screen w-full overflow-hidden font-[Lausanne-500] mt-100">
            <div ref={picPanelScreen1} className="picPanel picPanel1 absolute w-full h-screen inset-0 z-0">
              <div className="z-10 inset-0 absolute h-full w-full flex justify-center">
                <div className="w-[31vw] h-screen rounded-[20px] overflow-hidden">
                  <figure className="w-full h-full bg-[url('https://k72.ca/images/teamMembers/Isa_640X960.jpg?w=640&h=960&s=5849bb72bb04be156ba2ff4048eb65b8')] bg-cover bg-[center center]">
                    <img
                      src="https://k72.ca/images/teamMembers/Isa_640X960.jpg?w=640&h=960&s=5849bb72bb04be156ba2ff4048eb65b8"
                      alt="img"
                      className="h-full w-full object-cover"
                    />
                  </figure>
                </div>
              </div>

              <div className="flex flex-col relative w-full h-screen items-center gap-16 pt-28">
                <div ref={picPanel1Marquee1} className="w-full z-0 h-auto text-9xl text-(--primary-color) uppercase opacity-0">
                  <MarqueeText
                    speed={180}
                    play={true}
                    children={"ISABELLA"}
                  />
                </div>
                <div ref={picPanel1Marquee2} className="w-full z-20 h-auto text-9xl text-(--primary-color) uppercase opacity-0">
                  <MarqueeText
                    speed={180}
                    play={true}
                    direction="right"
                    children={
                      <>
                        BEAUCHEMIN
                        <span className="text-3xl ml-20 mr-120 w-auto text-white">
                          Directrice principale
                        </span>
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div ref={picPanelScreen2} className="picPanel picPanel1 absolute w-full h-screen inset-0 z-0">
              <div className="z-10 inset-0 absolute h-full w-full flex justify-center">
                <div className="w-[31vw] h-screen rounded-[20px] overflow-hidden">
                  <figure className="w-full h-full bg-[url('https://k72.ca/images/teamMembers/Carl_640X960.jpg?w=640&h=960&s=b523e3784fbd5e71c1aa74a917445235')] bg-cover bg-[center center]">
                    <img
                      src="https://k72.ca/images/teamMembers/Carl_640X960.jpg?w=640&h=960&s=b523e3784fbd5e71c1aa74a917445235"
                      alt="img"
                      className="h-full w-full object-cover"
                    />
                  </figure>
                </div>
              </div>

              <div className="flex flex-col relative w-full h-screen items-center gap-16 pt-28">
                <div ref={picPanel2Marquee1} className="w-full z-0 h-auto text-9xl text-(--primary-color) uppercase opacity-0">
                  <MarqueeText
                    speed={180}
                    play={true}
                    children={"CARL"}
                  />
                </div>

                <div ref={picPanel2Marquee2} className="w-full z-20 h-auto text-9xl text-(--primary-color) uppercase opacity-0">
                  <MarqueeText
                    speed={180}
                    play={true}
                    direction="right"
                    children={
                      <>
                        GODBOUT
                        <span className="text-3xl ml-20 mr-120 w-auto text-white">
                          Directrice principale
                        </span>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main >
    </>
  );
};

export default Agence;
