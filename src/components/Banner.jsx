import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useCycle } from "framer-motion";
import { NavBar, SearchBar } from ".";
import { PopUpBuscador } from "./Buscador/PopUp";
import { AnimatePresence, motion } from "framer-motion";

export const Banner = () => {
  const ref = useRef(null);
  // const [openPopUp, setOpenPopUp] = useState(false);
  const [mobileNav, toggleMobileNav] = useCycle(false, true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const descY = useTransform(scrollYProgress, [0, 1], ["0%", "800%"]);

  const openPopUpBuscador = () => {
    toggleMobileNav();
  };

  //Impedir que se pueda hacer scroll cuando salte el popUp de buscar
  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileNav]);

  return (
    <div
      className="w-full h-screen overflow-hidden relative grid place-items-center"
      ref={ref}
    >
      {/* <NavBar /> */}
      {mobileNav === true ? (
        <div className="relative">
          <AnimatePresence>
            <motion.div className=" fixed z-50 top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden">
              <PopUpBuscador toggleMobileNav={toggleMobileNav} />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : null}
      <div className="absolute md:bottom-80">
        <div className="mx:w-80 md:w-full lg:w-11/12 lg:mx-auto px-1 z-30">
          <div
            className="relative border-none
                  rounded-xl
                  py-2 bg-transparent md:px-6 lg:w-fit"
          >
            <h1
              style={{ y: textY }}
              className="text-semibold text-8xl relative z-20 w-full text-center
              text-bold bg-gradient-to-br from-white to-green-100
                    bg-clip-text xs:text-[2.30rem] xs:tracking-wide xs:text-pretty p-2
                    xm:text-5xl
                    leading-tight 
                    text-transparent 
                    2xl:max-w-screen-2xl 2xl:mx-auto
                    md:text-7xl md:tracking-wide lg:text-7xl xl:text-8xl 2xl:text-[7rem]"
            >
              Toda la belleza de Cataluña en un solo clic
            </h1>
          </div>
        </div>
        <div className="flex w-full justify-center py-8">
          <SearchBar openPopUpBuscador={openPopUpBuscador} />
        </div>
      </div>
      <div className="absolute inset-0 z-0 grid grid-row md:grid md:grid-cols-4">
        <div
          className="hover:backdrop-blur-0"
          style={{
            backgroundImage: `url(/lavanda.jpg)`,
            backgroundSize: `cover`,
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition: "backdrop-filter 0.3s ease",
              zIndex: 0,
            }}
            className="hover:backdrop-blur-0 backdrop-blur-sm w-full h-full absolute top-0 left-0 right-0 cursor-pointer"
          ></div>
        </div>
        <div
          className=""
          style={{
            backgroundImage: `url(/olivo.jpg)`,
            backgroundSize: `cover`,
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition: "backdrop-filter 0.3s ease",
              zIndex: 0,
            }}
            className="hover:backdrop-blur-0 backdrop-blur-sm w-full h-full absolute top-0 left-0 right-0 cursor-pointer"
          ></div>
        </div>
        <div
          className=""
          style={{
            backgroundImage: `url(/cerezoflor2.jpg)`,
            backgroundSize: `cover`,
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition: "backdrop-filter 0.3s ease",
              zIndex: 0,
            }}
            className="hover:backdrop-blur-0 backdrop-blur-sm w-full h-full absolute top-0 left-0 right-0 cursor-pointer"
          ></div>
        </div>
        <div
          className=""
          style={{
            backgroundImage: `url(/viñaaaa.jpg)`,
            backgroundSize: `cover`,
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition: "backdrop-filter 0.3s ease",
              zIndex: 0,
            }}
            className="hover:backdrop-blur-0 backdrop-blur-sm w-full h-full absolute top-0 left-0 right-0 cursor-pointer"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
