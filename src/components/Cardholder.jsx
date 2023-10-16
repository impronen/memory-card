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
    clickedImages: [],
    currentScore: 0,
    highScore: 0,
  });

  function handleClick(id) {
    console.log(id);
    if (
      imageStorage.clickedImages.some((clickedImage) => id === clickedImage)
    ) {
      resetScore();
    } else {
      logCorrectClick(id);
    }
    const newOrder = randomOrderer(imageStorage.storage);
    setImageStorage((prevState) => ({
      ...prevState,
      storage: newOrder,
    }));
  }

  function resetScore() {
    setImageStorage((prevState) => ({
      ...prevState,
      clickedImages: [],
      currentScore: 0,
    }));
  }

  function logCorrectClick(id) {
    setImageStorage((prevState) => {
      const newScore = prevState.currentScore + 1;
      const newHighScore =
        newScore > prevState.highScore ? newScore : prevState.highScore;

      const newState = {
        ...prevState,
        clickedImages: [...prevState.clickedImages, id],
        currentScore: newScore,
        highScore: newHighScore,
      };
      return newState;
    });
  }

  useEffect(() => {
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
      <div className="flex flex-row flex-wrap justify-around pn-10">
        <h2>Current Score: {imageStorage.currentScore}</h2>
        <h2>High Score: {imageStorage.highScore}</h2>
      </div>
      <div className="imageContainer flex flex-row flex-wrap py-8 ">
        {imageStorage.storage.map((image) => (
          <Card key={image.id} {...image} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}
