/* eslint-disable @typescript-eslint/no-unused-vars */
import { nanoid } from '@reduxjs/toolkit';
import { useState,FormEvent } from 'react';
import { starsTitlesInReview } from '../../../const';
import PropertyCommentStarItem from './property-comment-star-item';

export default function PropertyCommentStarList(): JSX.Element {
  const [starCount, setStar] = useState(0);
  const setStarTemplate = (evt:FormEvent<HTMLInputElement>) => (
    setStar(parseInt((evt.target as HTMLInputElement).value, 10))
  );
  const starList = starsTitlesInReview.map((starTitle, i) =>
    <PropertyCommentStarItem key = {nanoid()} starNumber = {i} starTitle = {starTitle} setRating = {setStarTemplate}/>,
  ).reverse();

  return (
    <div className="reviews__rating-form form__rating">
      {starList}
    </div>
  );
}
