import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec1_canvas";

export default function Section1() {
  const imgRef_1 = useRef<HTMLImageElement>(null);
  const imgRef_2 = useRef<HTMLImageElement>(null);
  const imgRef_3 = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const zIndexRef = useRef(11);
  const animationFrameId = useRef<number | null>(null);

  function lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
  }

  const [paths, setPaths] = useState([
    "M0,0 L0.4,0 L0.2,1 L0,1 Z",
    "M0.4,0 L0.8,0 L0.6,1 L0.2,1 Z",
    "M0.8,0 L1,0 L1,1 L0.6,1 Z",
  ]);

  useEffect(() => {
    if (!imgRef_1.current || !imgRef_2.current || !imgRef_3.current) return;

    const mouseEnter1 = () => {
      if (!imgRef_1.current || !imgRef_2.current || !imgRef_3.current) return;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      imgRef_2.current.style.zIndex = "10";
      imgRef_3.current.style.zIndex = "10";

      imgRef_1.current.style.zIndex = `${zIndexRef.current++}`;
      console.log(zIndexRef.current);

      let upperX = 0.4;
      let lowerX = 0.2;
      const targetX = 1;

      function animate() {
        upperX = lerp(upperX, targetX, 0.04);
        lowerX = lerp(lowerX, targetX, 0.04);

        setPaths([
          `M0,0 L${upperX},0 L${lowerX},1 L0,1 Z`,
          "M0.4,0 L0.8,0 L0.8,1 L0.2,1 Z",
          "M0.8,0 L1,0 L1,1 L0.6,1 Z",
        ]);

        if (
          Math.abs(upperX - targetX) > 0.001 ||
          Math.abs(lowerX - targetX) > 0.001
        ) {
          requestAnimationFrame(animate);
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    const mouseLeave1 = () => {
      if (!imgRef_1.current || !imgRef_2.current || !imgRef_3.current) return;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      let upperX = 1;
      let lowerX = 1;
      const targetX1 = 0.4;
      const targetX2 = 0.2;

      function animate() {
        upperX = lerp(upperX, targetX1, 0.04);
        lowerX = lerp(lowerX, targetX2, 0.04);

        setPaths([
          `M0,0 L${upperX},0 L${lowerX},1 L0,1 Z`,
          "M0.4,0 L0.8,0 L0.8,1 L0.2,1 Z",
          "M0.8,0 L1,0 L1,1 L0.6,1 Z",
        ]);

        if (
          Math.abs(upperX - targetX1) > 0.001 ||
          Math.abs(lowerX - targetX2) > 0.001
        ) {
          requestAnimationFrame(animate);
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    const mouseEnter2 = () => {
      if (!imgRef_1.current || !imgRef_2.current || !imgRef_3.current) return;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      imgRef_1.current.style.zIndex = "10";
      imgRef_3.current.style.zIndex = "10";

      imgRef_2.current.style.zIndex = `${zIndexRef.current++}`;

      let upperXLeft = 0.4;
      let lowerXLeft = 0.2;
      let upperXRight = 0.8;
      let lowerXRight = 0.6;
      const targetXLeft = 0;
      const targetXRight = 1;

      function animate() {
        upperXLeft = lerp(upperXLeft, targetXLeft, 0.04);
        lowerXLeft = lerp(lowerXLeft, targetXLeft, 0.04);
        upperXRight = lerp(upperXRight, targetXRight, 0.04);
        lowerXRight = lerp(lowerXRight, targetXRight, 0.04);

        setPaths([
          "M0,0 L0.4,0 L0.2,1 L0,1 Z",
          `M${upperXLeft},0 L${upperXRight},0 L${lowerXRight},1 L${lowerXLeft},1 Z`,
          "M0.8,0 L1,0 L1,1 L0.6,1 Z",
        ]);

        if (
          Math.abs(upperXLeft - targetXLeft) > 0.001 ||
          Math.abs(lowerXLeft - targetXLeft) > 0.001 ||
          Math.abs(upperXRight - targetXRight) > 0.001 ||
          Math.abs(lowerXRight - targetXRight) > 0.001
        ) {
          animationFrameId.current = requestAnimationFrame(animate);
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    const mouseLeave2 = () => {
      if (!imgRef_1.current || !imgRef_2.current || !imgRef_3.current) return;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      let upperXLeft = 0;
      let lowerXLeft = 0;
      let upperXRight = 1;
      let lowerXRight = 1;
      const targetUpperXLeft = 0.4;
      const targetUpperXRight = 0.8;
      const targetLowerXLeft = 0.2;
      const targetLowerXRight = 0.6;

      function animate() {
        upperXLeft = lerp(upperXLeft, targetUpperXLeft, 0.04);
        lowerXLeft = lerp(lowerXLeft, targetLowerXLeft, 0.04);
        upperXRight = lerp(upperXRight, targetUpperXRight, 0.04);
        lowerXRight = lerp(lowerXRight, targetLowerXRight, 0.04);

        setPaths([
          "M0,0 L0.4,0 L0.2,1 L0,1 Z",
          `M${upperXLeft},0 L${upperXRight},0 L${lowerXRight},1 L${lowerXLeft},1 Z`,
          "M0.8,0 L1,0 L1,1 L0.6,1 Z",
        ]);

        if (
          Math.abs(upperXLeft - targetUpperXLeft) > 0.01 ||
          Math.abs(lowerXLeft - targetLowerXLeft) > 0.01 ||
          Math.abs(upperXRight - targetUpperXRight) > 0.01 ||
          Math.abs(lowerXRight - targetLowerXRight) > 0.01
        ) {
          animationFrameId.current = requestAnimationFrame(animate);
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    const mouseEnter3 = () => {
      if (!imgRef_1.current || !imgRef_2.current || !imgRef_3.current) return;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      imgRef_1.current.style.zIndex = "10";
      imgRef_2.current.style.zIndex = "10";

      imgRef_3.current.style.zIndex = `${zIndexRef.current++}`;

      let upperX = 0.8;
      let lowerX = 0.6;
      const targetX = 0;

      function animate() {
        upperX = lerp(upperX, targetX, 0.04);
        lowerX = lerp(lowerX, targetX, 0.04);

        setPaths([
          "M0,0 L0.4,0 L0.2,1 L0,1 Z",
          "M0.4,0 L0.8,0 L0.8,1 L0.2,1 Z",
          `M${upperX},0 L1,0 L1,1 L${lowerX},1 Z`,
        ]);

        if (
          Math.abs(upperX - targetX) > 0.01 ||
          Math.abs(lowerX - targetX) > 0.01
        ) {
          requestAnimationFrame(animate);
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    const mouseLeave3 = () => {
      if (!imgRef_1.current || !imgRef_2.current || !imgRef_3.current) return;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      let upperX = 0;
      let lowerX = 0;
      const targetX1 = 0.8;
      const targetX2 = 0.6;

      function animate() {
        upperX = lerp(upperX, targetX1, 0.04);
        lowerX = lerp(lowerX, targetX2, 0.04);

        setPaths([
          "M0,0 L0.4,0 L0.2,1 L0,1 Z",
          "M0.4,0 L0.8,0 L0.8,1 L0.2,1 Z",
          `M${upperX},0 L1,0 L1,1 L${lowerX},1 Z`,
        ]);

        if (
          Math.abs(upperX - targetX1) > 0.01 ||
          Math.abs(lowerX - targetX2) > 0.01
        ) {
          requestAnimationFrame(animate);
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    imgRef_1.current.addEventListener("mouseenter", mouseEnter1);
    imgRef_1.current.addEventListener("mouseleave", mouseLeave1);
    imgRef_2.current.addEventListener("mouseenter", mouseEnter2);
    imgRef_2.current.addEventListener("mouseleave", mouseLeave2);
    imgRef_3.current.addEventListener("mouseenter", mouseEnter3);
    imgRef_3.current.addEventListener("mouseleave", mouseLeave3);

    return () => {
      imgRef_1.current?.removeEventListener("mouseenter", mouseEnter1);
      imgRef_1.current?.removeEventListener("mouseleave", mouseLeave1);
      imgRef_2.current?.removeEventListener("mouseenter", mouseEnter2);
      imgRef_2.current?.removeEventListener("mouseleave", mouseLeave2);
      imgRef_3.current?.removeEventListener("mouseenter", mouseEnter3);
      imgRef_3.current?.removeEventListener("mouseleave", mouseLeave3);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const effect = new Effect(ctx, canvas.width, canvas.height);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          effect.animate();
        } else {
          effect.stop();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(canvas);

    return () => {
      observer.unobserve(canvas);
    };
  }, []);

  return (
    <>
      <section className="section_1">
        <canvas ref={canvasRef} className="section_1__canvas"></canvas>
        <div className="section_1__child_1">
          <h1>Away now...</h1>
        </div>

        <div className="section_1__child_2">
          <div
            className="section_1__child_2__div_1"
            ref={imgRef_1}
            style={{ clipPath: "url(#clip1)" }}
          >
            <img src="/painting-7.jpeg" alt="painting #1" />
          </div>
          <div
            className="section_1__child_2__div_2"
            ref={imgRef_2}
            style={{ clipPath: "url(#clip2)" }}
          >
            <img src="/painting-7.jpeg" alt="painting #1" />
          </div>
          <div
            className="section_1__child_2__div_3"
            ref={imgRef_3}
            style={{ clipPath: "url(#clip3)" }}
          >
            <img src="/painting-7.jpeg" alt="painting #1" />
          </div>
        </div>
      </section>
      <svg width="0" height="0">
        <defs>
          <clipPath id="clip1" clipPathUnits="objectBoundingBox">
            <path d={paths[0]} />
          </clipPath>
          <clipPath id="clip2" clipPathUnits="objectBoundingBox">
            <path d={paths[1]} />
          </clipPath>
          <clipPath id="clip3" clipPathUnits="objectBoundingBox">
            <path d={paths[2]} />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
