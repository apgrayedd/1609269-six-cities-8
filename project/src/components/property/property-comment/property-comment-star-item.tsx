import {FormEvent} from 'react';

type starOption = {
  starNumber: number,
  starTitle: string,
  setRating: (evt: FormEvent<HTMLInputElement>) => void,
}

export default function PropertyCommentStarItem({starNumber, starTitle, setRating}:starOption): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={starNumber + 1}
        id={`${starNumber + 1}-stars`}
        type="radio"
        onChange = {setRating}
        value = {starNumber + 1}
      />
      <label
        htmlFor={`${starNumber + 1}-stars`}
        className="reviews__rating-label form__rating-label"
        title={starTitle}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}
