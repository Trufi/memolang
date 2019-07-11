import { v3beta1 } from '@google-cloud/translate';
const { TranslationServiceClient } = v3beta1;

const projectId = 'memlang';
const location = 'global';

const translationClient = new TranslationServiceClient();

export async function translateText(text: string): Promise<string[]> {
  if (text.length > 100) {
    return [];
  }

  const request = {
    parent: translationClient.locationPath(projectId, location),
    contents: [text],
    mimeType: 'text/plain',
    sourceLanguageCode: 'ru-RU',
    targetLanguageCode: 'en-US',
  };

  const [response] = await translationClient.translateText(request);

  return response.translations.map((t: any) => t.translatedText);
}
