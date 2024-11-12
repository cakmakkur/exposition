import { useEffect, useRef, useState } from "react";

export default function Clock() {
  const numbersImgRef_s1 = useRef<HTMLImageElement>(null);
  const numbersImgRef_s2 = useRef<HTMLImageElement>(null);
  const numbersImgRef_m1 = useRef<HTMLImageElement>(null);
  const numbersImgRef_m2 = useRef<HTMLImageElement>(null);
  const numbersImgRef_h1 = useRef<HTMLImageElement>(null);
  const numbersImgRef_h2 = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const [s1Index, setS1Index] = useState(0);
  const [s2Index, setS2Index] = useState(0);
  const [m1Index, setM1Index] = useState(0);
  const [m2Index, setM2Index] = useState(0);
  const [h1Index, setH1Index] = useState(0);
  // const [h2Index, setH2Index] = useState(1);
  const numbersPositions = [
    -3, -57, -115, -171, -225, -282, -335, -389, -445, -498,
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setS1Index((prevIndex): number => {
        const newIndex = prevIndex !== 9 ? prevIndex + 1 : 0;
        numbersImgRef_s1.current!.style.transform = `translateY(${numbersPositions[newIndex]}px)`;
        return newIndex;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as unknown as number);
      }
    };
  }, []);

  useEffect(() => {
    if (!numbersImgRef_s1.current || !numbersImgRef_s2.current) return;
    if (s1Index !== 0) return;

    setS2Index((prevIndex): number => {
      const newIndex = s2Index !== 5 ? prevIndex + 1 : 0;
      numbersImgRef_s2.current!.style.transform = `translateY(${numbersPositions[newIndex]}px)`;
      return newIndex;
    });

    return () => {};
  }, [s1Index]);

  useEffect(() => {
    if (!numbersImgRef_s1.current || !numbersImgRef_s2.current) return;
    if (s2Index !== 0) return;

    setM1Index((prevIndex): number => {
      const newIndex = m1Index !== 9 ? prevIndex + 1 : 0;
      numbersImgRef_m1.current!.style.transform = `translateY(${numbersPositions[newIndex]}px)`;
      return newIndex;
    });

    return () => {};
  }, [s2Index]);

  useEffect(() => {
    if (!numbersImgRef_s1.current || !numbersImgRef_s2.current) return;
    if (m1Index !== 0) return;

    setM2Index((prevIndex): number => {
      const newIndex = m2Index !== 5 ? prevIndex + 1 : 0;
      numbersImgRef_m2.current!.style.transform = `translateY(${numbersPositions[newIndex]}px)`;
      return newIndex;
    });

    return () => {};
  }, [m1Index]);

  useEffect(() => {
    if (!numbersImgRef_s1.current || !numbersImgRef_s2.current) return;
    if (m2Index !== 0) return;

    setH1Index((prevIndex): number => {
      const newIndex = h1Index !== 9 ? prevIndex + 1 : 0;
      numbersImgRef_h1.current!.style.transform = `translateY(${numbersPositions[newIndex]}px)`;
      return newIndex;
    });

    return () => {};
  }, [m2Index]);

  // the last one

  // useEffect(() => {
  //   if (!numbersImgRef_s1.current || !numbersImgRef_s2.current) return;
  //   if (h1Index !== 0) return;

  //   setH2Index((prevIndex): number => {
  //     const newIndex = h2Index === 2 && h1Index === 4 ? prevIndex + 1 : 0;
  //     numbersImgRef_h2.current!.style.transform = `translateY(${numbersPositions[newIndex]}px)`;
  //     return newIndex;
  //   });

  //   return () => {};
  // }, [h1Index]);

  return (
    <div className="clock_box">
      <div className="number_box">
        <img
          ref={numbersImgRef_h2}
          className="numbers_img"
          src="/numbers3.png"
          alt="numbers"
        />
      </div>
      <div className="number_box">
        <img
          ref={numbersImgRef_h1}
          className="numbers_img"
          src="/numbers3.png"
          alt="numbers"
        />
      </div>
      <div className="numbers_separator_box">:</div>
      <div className="number_box">
        <img
          ref={numbersImgRef_m2}
          className="numbers_img"
          src="/numbers3.png"
          alt="numbers"
        />
      </div>
      <div className="number_box">
        <img
          ref={numbersImgRef_m1}
          className="numbers_img"
          src="/numbers3.png"
          alt="numbers"
        />
      </div>
      <div className="numbers_separator_box">:</div>
      <div className="number_box">
        <img
          ref={numbersImgRef_s2}
          className="numbers_img"
          src="/numbers3.png"
          alt="numbers"
        />
      </div>
      <div className="number_box">
        <img
          ref={numbersImgRef_s1}
          className="numbers_img"
          src="/numbers3.png"
          alt="numbers"
        />
      </div>
    </div>
  );
}
