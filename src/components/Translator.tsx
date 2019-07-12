import React, { useState } from 'react';

// const baseUrl = 'http://localhost:5000/memlang/us-central1';
const baseUrl = 'https://us-central1-memlang.cloudfunctions.net';

function translate(text: string, authToken: string) {
  return fetch(`${baseUrl}/translate/${encodeURIComponent(text)}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((res) => res.json());
}

export const Translator = ({ authToken }: { authToken: string }) => {
  const [text, setText] = useState('');
  const [translations, setTranslations] = useState<string[]>([]);

  const onSubmit = () => {
    if (text.length > 2 && text.length < 100) {
      translate(text, authToken).then((t) => setTranslations(t));
    }
  };

  const onKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.which === 13) {
      onSubmit();
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
      {translations.length > 0 && (
        <div>
          <h3>Translations:</h3>
          <ul>
            {translations.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
