export default function Card({ id, url, alt_description, creator, portfolio }) {
  return (
    <div className="imageCard">
      <img src={url} alt={alt_description} />
      <p>text</p>
    </div>
  );
}
