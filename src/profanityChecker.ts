import { ProfanityConfig } from './profanityConfig.js';

/**
 * Profanity checker that inherits configuration settings from ProfanityConfig.
 * Provides methods to check bad words in a sentence and censor them.
 */
export class ProfanityChecker extends ProfanityConfig {
  /**
   * Normalizes a sentence by removing non-alphabetical characters and splitting it into words.
   * @param sentence - The sentence to normalize.
   * @returns An array of words from the sentence.
   */
  private static normalizeSentence(sentence: string): string[] {
    return sentence.replace(/[^a-zA-Zàâäéèêëîïôöùûüç\s]/g, '').split(/\s+/);
  }

  /**
   * Checks whether the sentence contains any bad words from the badWordsSet, excluding whitelisted words.
   * @param sentence - The sentence to check for bad words.
   * @returns `true` if bad words are found, `false` otherwise.
   */
  public static hasBadWords(sentence: string): boolean {
    const words = this.normalizeSentence(sentence);
    return words.some((word) => {
      return (
        this.badWordsSet.has(word.toLowerCase()) &&
        !this.whiteListWordsSet.has(word.toLowerCase())
      );
    });
  }

  /**
   * Censors bad words in the sentence by replacing them with the censored character.
   * @param sentence - The sentence to censor.
   * @returns The sentence with censored words replaced by the censor character.
   */
  public static censoredSentence(sentence: string): string {
    const words = this.normalizeSentence(sentence);
    const censoredWords = words.map((word) =>
      this.badWordsSet.has(word.toLowerCase()) &&
      !this.whiteListWordsSet.has(word.toLowerCase())
        ? this.censoreSet.repeat(word.length)
        : word,
    );
    return censoredWords.join(' ');
  }

  /**
   * Returns a list of all bad words currently in the badWordsSet.
   * @returns An array of bad words.
   */
  public static listbadWords(): string[] {
    return Array.from(this.badWordsSet);
  }

  /**
   * Returns a list of all whitelisted words currently in the whiteListWordsSet.
   * @returns An array of whitelisted words.
   */
  public static listWhiteListWords(): string[] {
    return Array.from(this.whiteListWordsSet);
  }
}
