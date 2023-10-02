import { useEffect, useState } from "react";
import imageStoragePopulator from "../helpers/helpers";
import Card from "./Card";

export default function CardHolder() {
  const searchTerm = "nordics";
  const orientation = "landscape";
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const apiQueryUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&orientation=${orientation}`;

  const [imageStorage, setImageStorage] = useState({
    storage: [],
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
        const imageObjects = imageStoragePopulator(imageData);
        console.log(imageObjects);

        setImageStorage((prevState) => ({
          ...prevState,
          storage: imageObjects,
        }));
        console.log("Updated Image Storage:", imageStorage);
      } catch (error) {
        console.error("Something is wrong", error);
      }
    })();
  }, [accessKey, apiQueryUrl]);

  return (
    <>
      <div className="imageContainer">
        {imageStorage.storage.map((image) => (
          <Card key={image.id} {...image} />
        ))}
      </div>
    </>
  );
}
