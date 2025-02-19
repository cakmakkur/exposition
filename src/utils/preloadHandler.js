import lunar_echo from "/painting-1.jpeg";
import dieSängerin from "/painting-2.jpeg";
import bonesAndDrums from "/painting-3.jpeg";
import awayNow from "/painting-7.jpeg";
import aufDerSpur from "/painting-8.jpeg";
import heimWegDark from "/painting-11-night1.jpeg";
import heimwegLight from "/painting-11.jpeg";
import painting_8 from "/painting-16.jpeg";
import earlyBlossom from "/early_blossom.jpeg";
import noName from "/painting-20.jpeg";
import justMet from "/painting-38.jpeg";
import noName2 from "/painting-27.jpeg";
import noName3 from "/painting-227.jpeg";

export default function preloadHandler(onProgress, onComplete) {
  let loadedCount = 0;
  let loadedImages = {};

  const images = [
    lunar_echo,
    dieSängerin,
    bonesAndDrums,
    awayNow,
    aufDerSpur,
    heimWegDark,
    heimwegLight,
    painting_8,
    earlyBlossom,
    noName,
    justMet,
    noName2,
    noName3,
  ];

  images.forEach((image) => {
    const img = new Image();
    img.src = image;
    let imageName = image.split(".")[0].split("/")[1];
    img.onload = () => {
      loadedCount++;
      loadedImages[imageName] = img;
      onProgress(loadedCount / images.length);

      if (loadedCount === images.length) {
        onComplete(loadedImages);
      }
    };

    img.onerror = () => {
      loadedCount++;
      onProgress(loadedCount / images.length);

      if (loadedCount === images.length) {
        onComplete(loadedImages);
      }

      console.error("Error loading image:", image);
    };
  });
}
