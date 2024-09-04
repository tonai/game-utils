import type { ITranslations } from "../types";

export function createTranslator(translations: ITranslations) {
  return (language: keyof typeof translations) => {
    return (word: string): string => {
      if (
        language &&
        language in translations &&
        word in translations[language]
      ) {
        return translations[language][word];
      }
      return word;
    };
  };
}
