import * as express from 'express';
import * as admin from 'firebase-admin';

export const validateFirebaseIdToken: express.RequestHandler = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.sendStatus(403);
    return;
  }

  const idToken = req.headers.authorization.split('Bearer ')[1];

  try {
    await admin.auth().verifyIdToken(idToken);
    next();
    return;
  } catch (error) {
    res.sendStatus(403);
    return;
  }
};
