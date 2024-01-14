"use client";
import React from 'react';
import CardToday from './CardToday';

const CardsToday = (props:any) => {
  const deck_id = props.params?.id;

  return (
    <div className='height-wrapper  bg-slate-100	'>
      <CardToday deck_id={deck_id} />
    </div>
  );
};

export default CardsToday;