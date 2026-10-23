import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LoadingBars = () => {
    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1 });

        tl.to(".loadingBars", {
            height: "100%",
            duration: 0.3,
            stagger: {
                amount: 0.2,
            },
        });

        tl.to(".loadingBars", {
            height: "15%",
            duration: 0.3,
            stagger: {
                amount: 0.2
            }

        })

        return () => tl.kill();
    });

    return (
        <>
            <div className="w-13 h-7 flex rotate-180 mb-0.5 mr-0.5">
                <div className="loadingBars bg-white w-[25%] h-[15%]"></div>
                <div className="loadingBars bg-white w-[25%] h-[15%]"></div>
                <div className="loadingBars bg-white w-[25%] h-[15%]"></div>
                <div className="loadingBars bg-white w-[25%] h-[15%]"></div>
            </div>
        </>
    );
};

export default LoadingBars;
