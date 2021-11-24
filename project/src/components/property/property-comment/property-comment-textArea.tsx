import { useState,FormEvent } from 'react';
import { initialComment } from './property-comment';

export default function PropertyCommentTextArea(): JSX.Element {
  const [commentText, setComment] = useState(initialComment.commentText);
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
      data-testid = 'comment-textarea'
    />
  );
}
