import { badWords } from './words/words.js'; // Import the list of predefined bad words

/**
 * Configuration class for managing the profanity checker.
 * Contains settings like bad words, censored character, and whitelisted words.
 */
export class ProfanityConfig {
  protected static badWordsSet: Set<string> = new Set(badWords);
  protected static censoreSet: string = '*';
  protected static whiteListWordsSet: Set<string> = new Set();

  /**
   * This method allows you to change the default censor character.
   * You can use any string for replacement, e.g., '$' or '!'.
   * @param replacement - The string to use as the replacement for censored words.
   */
  public static changeCensoredWords(replacement: string): void {
    this.censoreSet = replacement;
  }

  /**
   * Adds bad words to the badWordsSet.
   * Accepts either a single string or an array of strings.
   * @param words - The word(s) to add to the bad words set.
   */
  public static addBadWords(words: string | string[]): void {
    if (typeof words === 'string') {
      this.badWordsSet.add(words.toLowerCase());
    } else {
      words.forEach((word) => this.badWordsSet.add(word.toLowerCase()));
    }
  }

  /**
   * Adds words to the whitelist. Whitelisted words will not be censored.
   * Accepts either a single string or an array of strings.
   * @param words - The word(s) to add to the whitelist.
   */
  public static addWhiteList(words: string | string[]): void {
    if (typeof words === 'string') {
      this.whiteListWordsSet.add(words.toLowerCase());
    } else {
      words.forEach((word) => this.whiteListWordsSet.add(word.toLowerCase()));
    }
  }
}
