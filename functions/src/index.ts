import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { translateText } from './translate';

admin.initializeApp();

const corsHandler = cors({ origin: true });

export const translate = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    if (typeof req.query.t !== 'string' || req.query.t.length < 3) {
      res.sendStatus(400);
      return;
    }

    const text = decodeURIComponent(req.query.t);

    const translations = await translateText(text);

    res.send(JSON.stringify(translations));
  });
});
