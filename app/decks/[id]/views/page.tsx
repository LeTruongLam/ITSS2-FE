"use client";
import React from 'react';
import Card from './Card';

const Quizlet = (props:any) => {
  const deck_id = props.params?.id;

  return (
    <div className='height-wrapper  bg-slate-100	'>
      <Card deck_id={deck_id} />
    </div>
  );
};

export default Quizlet;