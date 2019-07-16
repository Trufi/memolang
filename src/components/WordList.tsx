import React, { useEffect, useState } from 'react';
import { getWords } from '../firebase';

export interface Props {
  userId: string;
}

export const WordList = ({ userId }: Props) => {
  const [words, setWords] = useState<Array<{ en: string; ru: string }>>([]);

  useEffect(() => {
    getWords(userId).then((res) => setWords(res));
  }, [userId]);

  return (
    <div>
      <ul>
        {words.map(({ en, ru }, i) => (
          <li key={i}>
            {en} - {ru}
          </li>
        ))}
      </ul>
    </div>
  );
};
