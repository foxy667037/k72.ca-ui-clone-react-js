import gsap from "gsap";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { NavLink } from "react-router";
import { useEffect, useRef } from "react";
import { ClockComponent, LogoComponent } from "../index.js";
import MarqueComponent from "../shared/MarqueComponent.jsx";
import useNavbarMenu from "../../context/navbarMenu/useNavbarMenu.js";

import Image1 from "../../assets/images/K72_Image_640x290.jpg";
import Image2 from "../../assets/images/K72_Image_640x290.jpg";
import Image3 from "../../assets/images/K72_Image_640x290.jpg";
import Image4 from "../../assets/images/K72_Image_640x290.jpg";

/* ---------- Static data (hoisted outside the component) ---------- */
const BOTTOM_SOCIAL_LINKS = [
  { name: "FB", to: "/fb.com" },
  { name: "IG", to: "/in.com" },
  { name: "IN", to: "/ig.com" },
  { name: "BE", to: "/be.com" },
];

const BOTTOM_MENU_LINKS = [
  { name: "Politique de confidentialité", to: "/Politique de confidentialité" },
  { name: "Avis de confidentialité", to: "/Avis de confidentialité" },
  { name: "Rapport éthique", to: "/Rapport éthique" },
  { name: "Options De Consentement", to: "/Options De Consentement" },
];

const MENU_LINKS_LIST = [
  {
    linkName: "PROJETS",
    linkSecondName: "POUR TOUT VOIR",
    linkImageLink: Image1,
  },
  {
    linkName: "AGENCE",
    linkSecondName: "POUR TOUT SAVOIR",
    linkImageLink: Image2,
  },
  {
    linkName: "CONTACT",
    linkSecondName: "POUR ENVOYER UN FAX",
    linkImageLink: Image3,
  },
  {
    linkName: "BLOGUE",
    linkSecondName: "POUR ENVOYER UN FAX",
    linkImageLink: Image4,
  },
];

const NavbarMenu = () => {
  const navbarMenuRef = useRef(null);
  const parentBarContainerRef = useRef(null);

  const lenisRef = useRef(null);
  const scrollYRef = useRef(null);
  const timelineRef = useRef(null);
  const isFirstRender = useRef(true);
  const previousOverflowRef = useRef(null);

  const { navbarMenuIsOpened, navbarMenuClose } = useNavbarMenu();


  /* ------------------------------------------------------------------
     1. Lenis — created ONCE, with a proper raf loop + cleanup
     ------------------------------------------------------------------ */
  useEffect(() => {
    const lenis = new Lenis({ duration: 2, smoothWheel: true });
    lenisRef.current = lenis;

    let rafId = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);


  /* ------------------------------------------------------------------
     2. Scroll lock — no layout shift (compensates scrollbar width)
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!navbarMenuIsOpened) return;

    const body = document.body;
    const lenis = lenisRef.current;
    const html = document.documentElement;

    // Save the scroll position only when opening
    if (scrollYRef.current === null) {
      scrollYRef.current = window.scrollY;

      previousOverflowRef.current = {
        html: html.style.overflow,
        body: body.style.overflow,
      };
    }

    // Stop smooth scrolling
    lenis?.stop();
  }, [navbarMenuIsOpened]);


  // recover previous scroll function
  const unlockPageScroll = () => {
    const lenis = lenisRef.current;
    const savedScrollY = scrollYRef.current;
    const previousOverflow = previousOverflowRef.current;

    document.documentElement.style.overflow =
      previousOverflow?.html ?? "";

    document.body.style.overflow =
      previousOverflow?.body ?? "";

    if (savedScrollY !== null) {
      if (lenis) {
        lenis.start();
        lenis.scrollTo(savedScrollY, {
          immediate: true,
        });
      } else {
        window.scrollTo(0, savedScrollY);
      }
    } else {
      lenis?.start();
    }

    scrollYRef.current = null;
    previousOverflowRef.current = null;
  };


  /* ------------------------------------------------------------------
     3. Escape key closes the menu
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!navbarMenuIsOpened) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") navbarMenuClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navbarMenuIsOpened, navbarMenuClose]);


  /* ------------------------------------------------------------------
     4. GSAP animation
     ------------------------------------------------------------------ */
  useGSAP(
    () => {
      // Skip the very first run so we don't animate on page load
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      const menu = navbarMenuRef.current;
      const barContainer = parentBarContainerRef.current;
      const bars = gsap.utils.toArray(".navbar_menu_bars", barContainer);
      if (!menu || !barContainer || !bars.length) return;

      // Kill any in-flight timeline (prevents stale onComplete)
      timelineRef.current?.kill();
      timelineRef.current = null;

      const staggerConfiguration = { amount: 0.2, from: "end" };

      if (navbarMenuIsOpened) {
        const tl = gsap.timeline();
        timelineRef.current = tl;

        gsap.set(barContainer, {
          display: "flex",
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100vh",
          zIndex: 20,
        });

        gsap.set(bars, { height: 0 });

        gsap.set(menu, {
          display: "block",
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100vh",
          zIndex: 30,
          opacity: 0,
        });

        tl.to(bars, {
          height: "100%",
          duration: 0.8,
          ease: "power3.inOut",
          stagger: staggerConfiguration,
        }).to(menu, {
          opacity: 1,
          duration: 0.6,
          ease: "power3.inOut",
        });
      } else {
        const tl = gsap.timeline({
          onStart: () => {
            // Restore the original scroll position
            unlockPageScroll();
          },

          onComplete: () => {
            gsap.set(menu, {
              display: "none",
            });

            gsap.set(barContainer, {
              display: "none",
            });

          },
        });

        tl.to(menu, {
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
        }).to(bars, {
          height: 0,
          duration: 0.8,
          ease: "power3.inOut",
          stagger: {
            amount: 0.2,
            from: "end",
          },
        });
      }
    },
    {
      scope: parentBarContainerRef,
      dependencies: [navbarMenuIsOpened],
    },
  );

  return (
    <>
      <div
        ref={parentBarContainerRef}
        aria-hidden="true"
        className="navbar_bars inset-0 w-full h-screen overflow-hidden hidden"
      >
        <div className="navbar_menu_bars h-full w-[18%] bg-black" />
        <div className="navbar_menu_bars h-full w-[17%] bg-black" />
        <div className="navbar_menu_bars h-full w-[30%] bg-black" />
        <div className="navbar_menu_bars h-full w-[17%] bg-black" />
        <div className="navbar_menu_bars h-full w-[18%] bg-black" />
      </div>

      <div
        ref={navbarMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="animated_navbar inset-0 w-full h-screen overflow-hidden hidden"
      >
        <div className="navbar_items w-full h-full">
          <div className="w-full flex h-[17.5%] border-b border-white/50 justify-between items-end">
            <div className="w-[50%] h-full bg-black p-2">
              <LogoComponent SvgFillColor={"fill-white"} />
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={navbarMenuClose}
              className="w-[50%] h-full flex justify-end scale-150 pt-2 pr-22"
            >
              <div className="flex cursor-pointer w-28 h-full justify-center items-center group">
                <div className="h-full w-px bg-white rotate-45 transition-all group-hover:bg-(--primary-color)" />
                <div className="h-full w-px bg-white rotate-135 transition-all group-hover:bg-(--primary-color)" />
              </div>
            </button>
          </div>

          <ul className="flex flex-col w-full h-[65%]">
            {MENU_LINKS_LIST.map((menuLink) => (
              <li
                key={menuLink.linkName}
                className="relative w-full text-white uppercase h-[25%] border-b border-white/50 text-[6.5em] font-[Lausanne-500] cursor-pointer group overflow-hidden"
              >
                <div className="w-full h-0 absolute bg-(--primary-color) z-10 transition-all group-hover:h-full" />

                <a className="relative w-full h-full pt-5 flex justify-center items-center">
                  <span className="absolute text-white">
                    {menuLink.linkName}
                  </span>
                  <div className="z-10 overflow-hidden opacity-0 text-black transition-opacity ease-in-out group-hover:opacity-100">
                    <MarqueComponent
                      displayText={menuLink.linkSecondName}
                      ImageUrl={menuLink.linkImageLink}
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <div className="w-full h-[17.5%] border-b border-white/50 pb-3 pl-2 flex">
            <div className="h-full w-[25%] text-white flex">
              <ClockComponent />
            </div>

            <div className="h-full w-[50%] text-white flex">
              <ul className="w-full h-full text-white flex gap-3 justify-center items-end pb-2">
                {BOTTOM_MENU_LINKS.map((link) => (
                  <li
                    key={link.name}
                    className="text-[11px] uppercase font-[Lausanne-500] font-medium hover:text-(--primary-color) cursor-pointer"
                  >
                    <NavLink to={link.to}>
                      <span className="text-white">{link.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-full w-[25%] text-white">
              <ul className="w-full h-full text-white flex gap-1.25 justify-center items-end mt-1">
                {BOTTOM_SOCIAL_LINKS.map((link) => (
                  <li
                    key={link.name}
                    className="group pt-4 cursor-pointer h-auto"
                  >
                    <a
                      href={link.to}
                      className="border-2 border-white rounded-full flex items-end no-underline tracking-wide text-[2.15em] px-2.5 pt-2.25 leading-6 uppercase font-[Lausanne-500] group-hover:text-(--primary-color) group-hover:border-(--primary-color)"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMenu;
