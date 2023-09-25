import { useEffect } from "react";

export default function CardHolder() {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const searchTerm = "tundra";
  const apiQueryUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}`;
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
      } catch (error) {
        console.error("Something is wrong", error);
      }
    })();
  });

  return (
    <>
      <div>
        <p>text</p>
      </div>
    </>
  );
}
