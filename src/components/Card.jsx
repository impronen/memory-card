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
      onClick();
    }
  };
  return (
    <div className="imageCard p-2">
      <img src={url} alt={alt_description} onClick={handleClick} />
      <p className="tracking-wide text-center text-xs pt-1 ">
        <a href={portfolio} target="_blank" rel="noopener noreferrer">
          {creator}
        </a>
      </p>
    </div>
  );
}
