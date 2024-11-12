import { useState, useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
// import Section5 from "./sections/Section5";
import Section6 from "./sections/Section6";
import Section7 from "./sections/Section7";
import Section8 from "./sections/Section8";
import Divider from "./sections/Divider";

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const modalDivRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [startFadeIn, setStartFadeIn] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef2 = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleLoad() {
      setHasLoaded(true);
    }
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (!modalDivRef.current) return;
    modalDivRef.current.style.opacity = "0";
    timeoutRef.current = setTimeout(() => {
      setStartAnimation(true);
      setStartFadeIn(true);
    }, 300);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasLoaded]);

  useEffect(() => {
    if (!footerRef.current) return;
    timeoutRef2.current = setTimeout(() => {
      footerRef.current!.style.opacity = "1";
    }, 2000);
  }, [startFadeIn]);

  // if (!hasLoaded) {
  //   return (
  //     <div className="loading_div">
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="main_div">
      <div ref={modalDivRef} className="fade_out_modal_div"></div>
      <NavBar startFadeIn={startFadeIn} />
      {/* Start Page */}
      <Section3 startAnimation={startAnimation} />
      {/* Away Now */}
      <Section1 />
      <Divider top="#000000" bottom="#000000" />

      {/* Lunar Echo */}
      <Section2 />
      <Divider top="#000000" bottom="#000000" />

      {/* Drums and Bones */}
      <Section4 />
      {/* <Section5 /> */}
      <Divider top="#000000" bottom="#000000" />

      {/* Auf der Spur */}
      <Section6 />
      <Divider top="#000000" bottom="rgb(180, 180, 171)" />
      {/* Die Sängerin */}
      <Section7 />
      <Divider top="rgb(180, 180, 171)" bottom="rgb(0, 0, 0)" />

      {/* Heimweg */}
      <Section8 />

      <div ref={footerRef} className="footer">
        &copy; Kursat Cakmak
      </div>
    </div>
  );
}
