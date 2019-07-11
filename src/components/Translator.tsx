import React, { useState } from 'react';

function translate(text: string) {
  return fetch(
    `https://us-central1-memlang.cloudfunctions.net/translate?t=${encodeURIComponent(text)}`,
  ).then((res) => res.json());
}

export const Translator = () => {
  const [text, setText] = useState('');
  const [translations, setTranslations] = useState<string[]>([]);

  const onSubmit = () => {
    if (text.length > 2 && text.length < 100) {
      translate(text).then((t) => setTranslations(t));
    }
  };

  return (
    <div>
      <h1>Translator</h1>
      <input type='text' value={text} onChange={(ev) => setText(ev.target.value)} />
      <br />
      <button onClick={onSubmit}>Go</button>
      {translations.length && (
        <ul>
          {translations.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
