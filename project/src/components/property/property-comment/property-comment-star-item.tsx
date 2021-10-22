/* eslint-disable @typescript-eslint/no-explicit-any */
type starOption = {
  starNumber: number,
  starTitle: string,
  setRating: any,
}

export default function PropertyCommentStarItem({starNumber, starTitle, setRating}:starOption): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={starNumber}
        id={`${starNumber}-stars`}
        type="radio"
        onChange = {setRating}
        value = {starNumber}
      />
      <label
        htmlFor={`${starNumber}-stars`}
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