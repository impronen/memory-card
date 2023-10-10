import { useEffect, useState } from "react";
import {
  imageStoragePopulator,
  randomSearchTerm,
  randomOrderer,
} from "../helpers/helpers";

import Card from "./Card";

export default function CardHolder() {
  const searchTerms = [
    "finland lapland winter",
    "finland lake",
    "finland nature sunrise",
    "finland birch forest summer",
    "finland winter forest",
  ];
  const orientation = "landscape";
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState(randomSearchTerm(searchTerms));
  const [imageStorage, setImageStorage] = useState({
    storage: [],
    currentScore: 0,
    highScore: 0,
  });

  function handleClick(e) {
    const newOrder = randomOrderer(imageStorage.storage);
    setImageStorage((prevState) => ({
      ...prevState,
      storage: newOrder,
    }));
  }

  useEffect(() => {
    console.log(searchTerm);
    const apiQueryUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&orientation=${orientation}`;
    (async () => {
      try {
        const apiResponse = await fetch(apiQueryUrl, {
          headers: { Authorization: `Client-ID ${accessKey}` },
        });
        if (!apiResponse.ok)
          throw new Error(`Request failed, status: ${apiResponse.status}`);
        const imageData = await apiResponse.json();

        const imageObjects = imageStoragePopulator(imageData);

        setImageStorage((prevState) => ({
          ...prevState,
          storage: imageObjects,
        }));
      } catch (error) {
        console.error("Something is wrong", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessKey, searchTerm]); // Include searchTerm as a dependency

  return (
    <>
      <div className="imageContainer flex flex-row flex-wrap">
        {imageStorage.storage.map((image) => (
          <Card key={image.id} {...image} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}
