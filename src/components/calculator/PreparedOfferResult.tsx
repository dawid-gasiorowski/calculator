import useCalculatorState from "../../hooks/useCalculatorState";

const PreparedOfferResult = () => {
  const { preparedOffer } = useCalculatorState();

  if (!preparedOffer) return null;

  return (
    <div>
      <article className="message is-primary">
        <div className="message-header">
          <p>
            Przygotowana oferta - cena: <span className="tag is-warning mx-2">{preparedOffer.totalPrice} zł</span>
          </p>
        </div>
        <div className="message-body">
          {preparedOffer.items.map((offerItem) => (
            <div key={offerItem.id} className="py-2">
              {offerItem.isBundle && <span className="tag is-dark mr-2">Pakiet</span>}
              {offerItem.name}
              <span className="tag is-warning mx-2">{offerItem.price} zł</span>
            </div>
          ))}
        </div>
      </article>
      {preparedOffer.totalPrice < preparedOffer.regularPrice && (
        <div className="message is-danger my-4">
          <div className="message-body">
            Regularna cena (bez pakietu): <span className="tag is-warning mx-2">{preparedOffer.regularPrice} zł</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreparedOfferResult;
