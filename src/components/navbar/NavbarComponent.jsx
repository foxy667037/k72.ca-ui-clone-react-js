import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router";
import ScrollTrigger from "gsap/ScrollTrigger";
import useNavbarMenu from "../../context/navbarMenu/useNavbarMenu.js";
import {
  LogoComponent,
  NavbarMenu,
  NavbarLinkContent,
  NavbarBtnComponent,
} from "../index.js";

gsap.registerPlugin(ScrollTrigger);

const NavbarComponent = () => {
  const navbarBtnDivRef = useRef(null);
  const navbarLinksDivRef = useRef(null);
  const navbarContainerRef = useRef(null);
  const { navbarMenuOpen } = useNavbarMenu();

  const pathName = useLocation().pathname;

  const links = [
    {
      linkPath: "/projets",
      linkName: "PROJETS (17)",
      linkCSS: "h-[42%] w-[40%]",
      linkChildren: (
        <NavbarLinkContent linkName={"PROJETS (17)"} linkPath={"/projets"} />
      ),
    },
    {
      linkName: "AGENCE",
      linkPath: "/agence",
      linkCSS: "h-[68%] w-[60%]",
      linkChildren: (
        <NavbarLinkContent linkName={"AGENCE"} linkPath={"/agence"} />
      ),
    },
  ];

  useGSAP(() => {
    gsap.set(navbarLinksDivRef.current, {
      height: "1%",
    });
    gsap.set(navbarBtnDivRef.current, {
      height: "40%",
    });

    if (pathName !== "/") {
      gsap.set([navbarLinksDivRef.current, navbarBtnDivRef.current], {
        height: "100%",
      });
    }

    if (pathName !== "/") {
      const tl = gsap.timeline({
        paused: true,
      });

      tl.to(navbarBtnDivRef.current, {
        clipPath: "inset(0 0 60% 0)",
        duration: 0.3,
        ease: "power2.inOut",
      }).to(
        navbarLinksDivRef.current,
        {
          height: "1%",
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<",
      );

      ScrollTrigger.create({
        start: "200px top",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    }

    return;
  }, [pathName]);


  return (
    <>
      <div className="overflow-hidden">
        <header
          ref={navbarContainerRef}
          className="w-full h-[22%] fixed top-0 left-0 z-10 bg-transparent"
        >
          <div className="w-full h-full flex justify-between overflow-hidden">
            {/* LOGO */}
            <div className="p-2 z-100">
              <LogoComponent />
            </div>

            {/* Links + Button */}
            <div className="flex h-32.5 w-209 overflow-hidden">
              {/* Navbar Links */}
              <nav ref={navbarLinksDivRef} className={`h-[1%] w-[76%]`}>
                <ul className="flex h-full w-full">
                  {links.map((link) => (
                    <li
                      key={link.linkName}
                      className={`group bg-black ${link.linkCSS}`}
                    >
                      {link.linkChildren}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Navbar Button */}
              <div
                ref={navbarBtnDivRef}
                className={`w-[24%] h-[40%] overflow-hidden`}
              >
                <NavbarBtnComponent navbarMenuOpen={navbarMenuOpen} />
              </div>
            </div>
          </div>
        </header>

        <NavbarMenu />
      </div>
    </>
  );
};

export default NavbarComponent;
