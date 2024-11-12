import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec6_canvas";

export default function Section6() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const backgroundImg = new Image();
  backgroundImg.src = "/painting-8.jpeg";

  backgroundImg.onload = () => {
    setHasImageLoaded(true);
  };

  useEffect(() => {
    if (!canvasRef.current || !effectRef.current) return;
    if (shouldAnimate) {
      effectRef.current.animate();
    } else {
      effectRef.current.stop();
    }
  }, [shouldAnimate]);

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
          divRef.current!.style.opacity = "1";
        } else {
          divRef.current!.style.opacity = "0";
        }
      },
      { threshold: 0.3 }
    );
    observer2.observe(divRef.current!);

    const observer3 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current!.style.transform = "scale(1) translateY(0)";
          divRef.current!.style.opacity = "1";
        } else {
          titleRef.current!.style.transform = "scale(0) translateY(10vh)";
          divRef.current!.style.opacity = "0";
        }
      },
      { threshold: 0.3 }
    );
    observer3.observe(divRef.current!);

    return () => {
      if (canvasRef.current && divRef.current && titleRef.current) {
        observer.unobserve(canvasRef.current);
        observer2.unobserve(divRef.current);
        observer3.unobserve(titleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !hasImageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * 1.3;
    canvas.height = window.innerHeight * 1.5;

    effectRef.current = new Effect(
      ctx,
      canvas.width,
      canvas.height,
      backgroundImg
    );
  }, [hasImageLoaded]);

  return (
    <div ref={divRef} className="section_6">
      <h1 ref={titleRef} className="sec_6__titel">
        Auf der Spur
      </h1>
      <canvas ref={canvasRef} className="section_6__canvas"></canvas>
      <img
        className="sec_6__painting"
        src="/painting-8.jpeg"
        alt="painting #8"
      />
    </div>
  );
}
