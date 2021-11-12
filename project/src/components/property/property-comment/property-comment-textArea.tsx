import { useState,FormEvent } from 'react';

export default function PropertyCommentTextArea(): JSX.Element {
  const [commentText, setComment] = useState('');
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder="Tell how was your stay, what you like and what can be improved"
      defaultValue={commentText}
      onChange = {(evt: FormEvent<HTMLTextAreaElement>) => {
        setComment((evt.target as HTMLTextAreaElement).value);
      }}
    />
  );
}
