export default function Card({ id, url, alt_description, creator, portfolio }) {
  return (
    <div className="imageCard p-2">
      <img src={url} alt={alt_description} />
      <p className="tracking-wide text-center text-xs pt-1 ">
        <a href={portfolio} target="_blank" rel="noopener noreferrer">
          {creator}
        </a>
      </p>
    </div>
  );
}
