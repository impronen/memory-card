import { useEffect, useState } from "react";

export default function CardHolder() {
  const searchTerm = "tundra";
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const apiQueryUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}`;

  const [imageStorage, setImageStorage] = useState({
    imageStorage: [], //TODO: refactor this to be not just for URLs but all image data
    currentScore: 0,
    highScore: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const apiResponse = await fetch(apiQueryUrl, {
          headers: { Authorization: `Client-ID ${accessKey}` },
        });
        if (!apiResponse.ok)
          throw new Error(`Request failed, status: ${apiResponse.status}`);
        const imageData = await apiResponse.json();
        console.log(imageData);
        // helper that chooses 9 random image URL's and populates imageStorage
        // with objects created from those
      } catch (error) {
        console.error("Something is wrong", error);
      }
    })();
  }, [accessKey, apiQueryUrl]);

  return (
    <>
      <div>
        <p>text new</p>
      </div>
    </>
  );
}
