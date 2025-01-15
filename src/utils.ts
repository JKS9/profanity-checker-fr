import { badWords } from './words/words.js';

export class FrenchProfanityFilter {
  private static badWordsSet = new Set(badWords);

  private static normalizeSentence(sentence: string): string[] {
    return sentence
      .toLowerCase()
      .split(/\s+/);
  }

  public static hasBadWords(sentence: string): boolean {
    const words = this.normalizeSentence(sentence);
    return words.some((word) => {
      return this.badWordsSet.has(word);
    });
  }

  public static censoredSentence(sentence: string): string {
    const words = this.normalizeSentence(sentence);
    const censoredWords = words.map((word) =>
      this.badWordsSet.has(word) ? '*'.repeat(word.length) : word,
    );
    return censoredWords.join(' ');
  }
}
