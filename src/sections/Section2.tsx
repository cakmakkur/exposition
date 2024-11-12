import { useEffect, useRef } from "react";
// @ts-expect-error importing canvas class
import FlowFieldEffect from "../utils/sec2_canvas";

export default function Section2() {
  const imgRef_4 = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hueRotateRef = useRef(0);
  const canvasRef_1 = useRef<HTMLCanvasElement>(null);
  const flowFieldRef = useRef<FlowFieldEffect>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const animationFrameId_2 = useRef<number | null>(null);

  // ------------------------------------------- CANVAS

  useEffect(() => {
    if (!canvasRef_1.current) return;

    const ctx = canvasRef_1.current.getContext("2d");
    const canvas = canvasRef_1.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 1.3;
    flowFieldRef.current = new FlowFieldEffect(
      ctx,
      canvas.width,
      canvas.height
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canvasRef_1.current) {
          canvasRef_1.current.style.opacity = "0.1";
          flowFieldRef.current.animate(0);
        } else if (flowFieldRef.current.shouldAnimate && canvasRef_1.current) {
          canvasRef_1.current.style.opacity = "0";
          flowFieldRef.current.stop();
        }
      },
      { threshold: 0.4 }
    );

    if (!targetRef.current) return;
    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
      if (!flowFieldRef.current.shouldAnimate) {
        flowFieldRef.current.stop();
      }
    };
  }, []);

  // hue rotation effect
  useEffect(() => {
    if (!imgRef_4.current || !targetRef.current) return;

    const animate = () => {
      if (!imgRef_4.current) return;
      imgRef_4.current.style.filter = `hue-rotate(${
        hueRotateRef.current % 360
      }deg)`;
      // hueRotateRef.current += 0.1;
      hueRotateRef.current += 0.5;

      animationFrameId_2.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current!.style.transform = "translateX(0)";
          imgRef_4.current!.style.transform = "translateX(0)";
          animate();
        } else {
          if (animationFrameId_2.current) {
            cancelAnimationFrame(animationFrameId_2.current);
          }
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <section ref={targetRef} className="section_2">
      <canvas className="canvas_1 absoluteLargeFullScreen" ref={canvasRef_1} />
      <div className="section_2__child_1">
        <img ref={imgRef_4} src="/painting-1.jpeg" alt="painting #2" />
      </div>
      <div ref={titleRef} className="section_2__child_2">
        <h1>Lunar Echo</h1>
      </div>
    </section>
  );
}
