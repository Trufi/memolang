import React, { useState } from 'react';
import { addWord } from '../firebase';

// const baseUrl = 'http://localhost:5000/memlang/us-central1';
const baseUrl = 'https://us-central1-memlang.cloudfunctions.net';

function translate(text: string, authToken: string) {
  return fetch(`${baseUrl}/translate/${encodeURIComponent(text)}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((res) => res.json());
}

export const Translator = ({ authToken, userId }: { authToken: string; userId: string }) => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState<string>('');

  const onSubmit = () => {
    if (text.length > 2 && text.length < 100) {
      translate(text, authToken).then((t) => setTranslatedText(t.join(', ')));
    }
  };

  const onKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.which === 13) {
      onSubmit();
    }
  };

  const onTranslateSubmit = () => {
    if (text.length > 2 && text.length < 100 && translatedText.length > 2 && text.length < 100) {
      addWord(text, translatedText, userId);
    }
  };

  return (
    <div>
      <h1>Translator</h1>
      <div>
        Source text:{' '}
        <input
          type='text'
          value={text}
          onChange={(ev) => setText(ev.target.value)}
          onKeyPress={onKeyPress}
        />{' '}
        <button onClick={onSubmit}>Go</button>
      </div>
      {translatedText.length > 0 && (
        <div>
          <h3>Translation:</h3>
          <input
            type='text'
            value={translatedText}
            onChange={(ev) => setText(ev.target.value)}
            onKeyPress={onKeyPress}
          />
          <button onClick={onTranslateSubmit}>Save</button>
        </div>
      )}
    </div>
  );
};
