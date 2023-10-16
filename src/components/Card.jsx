export default function Card({
  id,
  url,
  alt_description,
  creator,
  portfolio,
  onClick,
}) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  return (
    <div className="imageCard p-2 w-1/3 flex flex-col justify-center">
      <img src={url} alt={alt_description} onClick={handleClick} />
      <p className="tracking-wide text-center text-xs p-3 ">
        Photo by:{" "}
        <a href={portfolio} target="_blank" rel="noopener noreferrer">
          {creator}
        </a>
      </p>
    </div>
  );
}
