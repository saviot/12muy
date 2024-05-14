import React from 'react';
import Card from './Card';

function Main({cardData, setCardData}) {
  return (
    <main>
      <section className='card'>
        <div className='card__container'>
          {cardData.map((card) => (
            <Card
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes}
              card_id={card._id}
              owner_id={card.owner._id}
              setCardData={setCardData}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
