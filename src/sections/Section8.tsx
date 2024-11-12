import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec8_canvas";
import Sliderbar from "../components/Sliderbar";

export default function Section8() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const nightImageRef = useRef<HTMLImageElement>(null);
  const [isOn, setIsOn] = useState(false);

  const [resizeToggle, setResizeToggle] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const painting = new Image();
  painting.src = "/painting-11.jpeg";

  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  painting.onload = () => {
    setHasImageLoaded(true);
  };

  useEffect(() => {
    if (!canvasRef.current || !hasImageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    effectRef.current = new Effect(ctx, canvas.width, canvas.height, painting);
  }, [hasImageLoaded, resizeToggle]);

  useEffect(() => {
    if (!canvasRef.current || !effectRef.current) return;
    if (shouldAnimate) {
      effectRef.current.animate();
    } else {
      effectRef.current.stop();
    }
  }, [shouldAnimate]);

  useEffect(() => {
    const handleResize = () => {
      setResizeToggle(!resizeToggle);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
        } else {
          setShouldAnimate(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(canvasRef.current);

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current!.style.transform = "scale(1) translateY(0)";
          divRef.current!.style.opacity = "1";
        } else {
          titleRef.current!.style.transform = "scale(0) translateY(10vh)";
          divRef.current!.style.opacity = "0";
        }
      },
      { threshold: 0.5 }
    );
    observer2.observe(divRef.current!);

    return () => {
      if (canvasRef.current && divRef.current) {
        observer.unobserve(canvasRef.current);
        observer2.unobserve(divRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!nightImageRef.current) return;
    if (!isOn) {
      nightImageRef.current.style.opacity = "1";
    } else {
      nightImageRef.current.style.opacity = "0";
    }
  }, [isOn]);

  return (
    <div ref={divRef} className="section_8">
      <img
        className="sec_8__bg_img"
        src="/painting-11.jpeg"
        alt="painting #11"
      />
      <h1 ref={titleRef} className="sec_8__titel">
        Heimweg
      </h1>
      <canvas ref={canvasRef} className="section_8__canvas"></canvas>
      <img
        ref={nightImageRef}
        className="sec_8__rep_img"
        src="/painting-11-night1.jpeg"
        alt="painting #11"
      />
      <div className="sec_8__switch_box">
        <img src="/light.svg" alt="light_icon" />
        <Sliderbar isOn={isOn} setIsOn={setIsOn} />
        <img src="/dark.svg" alt="dark_icon" />
      </div>
    </div>
  );
}
