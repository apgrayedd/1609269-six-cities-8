import { nanoid } from '@reduxjs/toolkit';
import { FormEvent } from 'react';
import { starsTitlesInReview } from '../../../const';
import PropertyCommentStarItem from './property-comment-star-item';

type StarListOption = {
  setStar: (startCount:number) => void;
  starCount: number,
}

export default function PropertyCommentStarList({setStar, starCount}:StarListOption): JSX.Element {
  const setStarTemplate = (evt:FormEvent<HTMLInputElement>) =>
    setStar(parseInt((evt.target as HTMLInputElement).value, 10));
  const starList = starsTitlesInReview.map((starTitle, i) =>
    (<PropertyCommentStarItem
      key = {nanoid()}
      starNumber = {i}
      starTitle = {starTitle}
      setRating = {setStarTemplate}
      status = {i + 1 === starCount}
    // eslint-disable-next-line indent
     />),
  ).reverse();

  return (
    <div className="reviews__rating-form form__rating" data-testid = 'comment-star-list'>
      {starList}
    </div>
  );
}
