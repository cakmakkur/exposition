import Section1 from "./Section1";
import Section2 from "./Section2";
import Section4 from "./Section4";
// import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8";
import Section9 from "./Section9";
import Divider from "./Divider";
import { useEffect, useState } from "react";
// @ts-expect-error importing helper function
import preloadHandler from "../utils/preloadHandler";
import Section10 from "./Section10";
import Section11 from "./Section11";
import Section12 from "./Section12";

interface LoadedImages {
  [key: string]: HTMLImageElement;
}

export default function Exposition() {
  const [hasLoadedAll, setHasLoadedAll] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [images, setImages] = useState<LoadedImages>({});

  useEffect(() => {
    preloadHandler(
      (count: number) => setLoadedCount(count), // onProgress
      (loadedImages: LoadedImages) => setImages(loadedImages) // onComplete
    );
  }, []);

  useEffect(() => {
    if (loadedCount === 1) {
      setHasLoadedAll(true);
    }
  }, [loadedCount]);

  if (!hasLoadedAll) {
    return (
      <div className="loading_div">
        <h1>Loading...</h1>
        <div className="loadingBar_container">
          <div
            className="loadingProgress"
            style={{ transform: `translateX(${loadedCount * 200 - 200}px)` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="exposition__main_div">
      {/* Away Now */}
      <Section1 painting={images["painting-7"]} />
      <Divider top="#000000" bottom="#000000" />

      {/* Lunar Echo */}
      <Section2 painting={images["painting-1"]} />
      <Divider top="#000000" bottom="#000000" />

      {/* Drums and Bones */}
      <Section4 painting={images["painting-3"]} />
      {/* <Section5 /> */}
      <Divider top="#000000" bottom="#000000" />

      {/* Auf der Spur */}
      <Section6 painting={images["painting-8"]} />
      <Divider top="#000000" bottom="rgb(180, 180, 171)" />
      {/* Die Sängerin */}
      <Section7 painting={images["painting-2"]} />
      <Divider top="rgb(180, 180, 171)" bottom="rgb(255, 255, 255)" />
      {/* Early Blossom */}
      <Section9 painting={images["early_blossom"]} />
      {/* No Name */}
      <Section10
        painting={images["painting-20"]}
        painting2={images["painting-38"]}
      />
      {/* No Name 2*/}
      <Section11 painting={images["painting-227"]} />
      {/* No Name 3*/}
      <Section12 painting={images["painting-27"]} />
      {/* Heimweg */}
      <Section8
        painting_light={images["painting-11"]}
        painting_dark={images["painting-11-night1"]}
      />
    </div>
  );
}
