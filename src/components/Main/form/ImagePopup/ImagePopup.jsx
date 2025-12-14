export default function ImagePopup({ card }) {
  const { link, name } = card;

  return (
    // Usamos un Fragmento (<>) para agrupar los elementos sin añadir un div extra al DOM
    <>
      <img
        className="card-popup__image"
        src={link}
        alt={`fotografia de ${name}`}
      />
      <h3 className="card-popup__caption">{name}</h3>
    </>
  );
}
