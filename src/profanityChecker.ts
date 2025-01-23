import { ProfanityConfig } from './profanityConfig.js';

export class ProfanityChecker extends ProfanityConfig {
  /**
   * Normalize the input sentence by removing unwanted characters and splitting it into an array of words.
   * @param sentence - The sentence to normalize.
   * @returns {string[]} - An array of normalized words.
   */
  public static normalizeSentence(sentence: string): string[] {
    return sentence
      .replace(/[^a-zA-Z0-9àâäéèêëîïôöùûüç\s.,!?]/gu, ' ') // Ajout du modificateur 'u' pour Unicode et 'g' pour global
      .trim() // Supprime les espaces en début/fin.
      .toLowerCase() // Convertir en minuscule.
      .split(/\s+/); // Divise en mots.
  }

  /**
   * Check if the sentence contains any bad words.
   * @param sentence - The sentence to check.
   * @returns {boolean} - True if bad words are found, otherwise false.
   */
  public static hasBadWords(sentence: string): boolean {
    const words = this.normalizeSentence(sentence);

    return words.some((word) => {
      const cleanedWord = word.replace(/[.,!?]+$/gu, '').toLowerCase();
      return (
        this.badWordsSet.has(cleanedWord) &&
        !this.whiteListWordsSet.has(cleanedWord)
      );
    });
  }

  /**
   * Censor bad words in the sentence by replacing them with asterisks.
   * @param sentence - The sentence to censor.
   * @returns {string} - The censored sentence.
   */
  public static censoredSentence(sentence: string): string {
    const words = this.normalizeSentence(sentence);
    const censoredWords = words.map((word) => {
      const cleanedWord = word.replace(/[.,!?]+$/gu, '').toLowerCase();

      if (
        this.badWordsSet.has(cleanedWord) &&
        !this.whiteListWordsSet.has(cleanedWord)
      ) {
        return '*'.repeat(cleanedWord.length) + word.slice(cleanedWord.length); // Replace with asterisks, keeping punctuation.
      }
      return word; // Keep the original word if not a bad word.
    });

    return censoredWords.join(' ').trim(); // Join words into a sentence.
  }

  /**
   * List all bad words currently in the set.
   * @returns {string[]} - An array of bad words.
   */
  public static listBadWords(): string[] {
    return Array.from(this.badWordsSet); // Convert the set to an array.
  }

  /**
   * List all whitelisted words currently in the set.
   * @returns {string[]} - An array of whitelisted words.
   */
  public static listWhiteListWords(): string[] {
    return Array.from(this.whiteListWordsSet);
  }
}
