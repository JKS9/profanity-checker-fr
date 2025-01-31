import { ProfanityConfig } from './profanityConfig.js';
import { parseString } from './utils/normalize.js';

export class ProfanityChecker extends ProfanityConfig {
  /**
   * Check if the sentence contains any bad words.
   * @param sentence - The sentence to check.
   * @returns {boolean} - True if bad words are found, otherwise false.
   */
  public static hasBadWords(sentence: string): boolean {
    const words = parseString(sentence);

    return words.some((word) => {
      const cleanedWord = word.replace(/[.,!?]/gu, '').toLowerCase();
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
    const words = parseString(sentence);

    const censoredWords = words.map((word) => {
      if (this.badWordsSet.has(word) && !this.whiteListWordsSet.has(word)) {
        return this.censoreSet.repeat(word.length); // Replace with asterisks, keeping punctuation.
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
