import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { translateText } from './translate';
import { validateFirebaseIdToken } from './bearer';

admin.initializeApp();

const app = express();

app.use(cors({ origin: true }));
app.use(validateFirebaseIdToken);

app.get('/:text', async (req, res) => {
  if (typeof req.params.text !== 'string' || req.params.text.length < 3) {
    res.sendStatus(400);
    return;
  }

  const text = decodeURIComponent(req.params.text);
  const translations = await translateText(text);
  res.send(JSON.stringify(translations));
});

export const translate = functions.https.onRequest(app);
