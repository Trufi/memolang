import axios from 'axios';

const baseURL = 'https://developers.lingvolive.com/api';

export const auth = () =>
  axios
    .post<string>(
      `${baseURL}/v1.1/authenticate`,
      {},
      {
        headers: {
          Authorization: `Basic ${process.env.LINGVO_KEY}`,
        },
      },
    )
    .then((res) => res.data);

export const translate = (text: string, token: string) =>
  axios
    .get(`${baseURL}/v1/Translation`, {
      params: {
        text,
        srcLang: 1033,
        dstLang: 1049,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const minicard = (text: string, token: string) =>
  axios
    .get(`${baseURL}/v1/Minicard`, {
      params: {
        text,
        srcLang: 1033,
        dstLang: 1049,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => [res.data.Translation.Translation]);
