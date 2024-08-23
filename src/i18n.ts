export function createTranslator(
  translations: Record<string, Record<string, string>>,
) {
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
