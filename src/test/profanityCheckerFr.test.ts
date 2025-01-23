import { ProfanityChecker } from '../profanityChecker.js';
import { ProfanityConfig } from '../profanityConfig.js';
import { test, expect, beforeAll } from 'vitest';

beforeAll(() => {
  ProfanityConfig.changeCensoredWords('*');
  ProfanityConfig.addBadWords([
    'salope',
    'putain de merde',
    'con',
    'sale pute',
  ]);
  ProfanityConfig.deleteBadWords(['delete']);
  ProfanityConfig.addWhiteList(['merde', 'white']);
  ProfanityConfig.deleteWhiteList(['white']);
});

test('hasBadWords detects bad words', () => {
  expect(
    ProfanityChecker.hasBadWords('ceci est une phrase avec un mot interdit'),
  ).toBe(false);
});

test('hasBadWords detects single bad word', () => {
  expect(
    ProfanityChecker.hasBadWords(
      "ceci est une phrase avec un mot interdit 'salope'",
    ),
  ).toBe(true);
});

test('hasBadWords detects multiple bad words', () => {
  expect(
    ProfanityChecker.hasBadWords(
      "ceci est une phrase avec un mot interdit 'putain de merde'",
    ),
  ).toBe(true);
});

test('hasBadWords detects no bad words', () => {
  expect(ProfanityChecker.hasBadWords('ceci est une phrase propre')).toBe(
    false,
  );
});

test('hasBadWords detects bad phrase', () => {
  expect(ProfanityChecker.hasBadWords('ceci est une phrase sale> pute')).toBe(
    true,
  );
});

test('hasBadWords detects bad word with punctuation', () => {
  expect(ProfanityChecker.hasBadWords('ceci est une phrase sale! pute')).toBe(
    true,
  );
});

test('hasBadWords detects bad word with special character before', () => {
  expect(ProfanityChecker.hasBadWords('ceci est une phrase sale>pute')).toBe(
    true,
  );
});

test('hasBadWords detects bad word with special character after', () => {
  expect(ProfanityChecker.hasBadWords('ceci est une phrase sale pute!')).toBe(
    true,
  );
});

test('hasBadWords detects bad word at the end with punctuation', () => {
  expect(ProfanityChecker.hasBadWords('ici est une phrase sale, pute!')).toBe(
    true,
  );
});

test('hasBadWords detects bad word at the start with punctuation', () => {
  expect(ProfanityChecker.hasBadWords('pute! est ici')).toBe(true);
});

test('hasBadWords detects bad words with mixed punctuation', () => {
  expect(ProfanityChecker.hasBadWords('salope, pute; et con.')).toBe(true);
});

test('hasBadWords does not detect whitelisted words', () => {
  expect(ProfanityChecker.hasBadWords('ceci est une phrase avec merde')).toBe(
    false,
  );
});

test('hasBadWords detects bad words with numbers', () => {
  expect(ProfanityChecker.hasBadWords('ceci est une phrase 1234 pute')).toBe(
    true,
  );
});

test('hasBadWords detects consecutive bad words with punctuation', () => {
  expect(ProfanityChecker.hasBadWords('salope, pute!')).toBe(true);
});

test('hasBadWords handles empty string', () => {
  expect(ProfanityChecker.hasBadWords('')).toBe(false);
});

test('censoredSentence censors bad words', () => {
  expect(
    ProfanityChecker.censoredSentence('ceci est une phrase sale> pute'),
  ).toBe('ceci est une phrase sale ****');
});

test('censoredSentence censors single bad word', () => {
  expect(
    ProfanityChecker.censoredSentence('ceci est une phrase avec un mot con'),
  ).toBe('ceci est une phrase avec un mot ***');
});

test('censoredSentence censors multiple bad words', () => {
  expect(
    ProfanityChecker.censoredSentence(
      "ceci est une phrase avec un mot 'putain de merde'",
    ),
  ).toBe('ceci est une phrase avec un mot ****** de merde');
});

test('censoredSentence leaves clean sentence unchanged', () => {
  const sentence = 'ceci est une phrase propre';
  expect(ProfanityChecker.censoredSentence(sentence)).toBe(sentence);
});

test('whitelisted words are not censored', () => {
  const sentence = 'ceci est une phrase avec merde mais pas de censure';
  expect(ProfanityChecker.censoredSentence(sentence)).toBe(sentence);
});

test('censoredSentence censors bad phrase with multiple bad words', () => {
  expect(ProfanityChecker.censoredSentence('salope et pute')).toBe(
    '****** et ****',
  );
});

test('censoredSentence handles punctuation', () => {
  expect(ProfanityChecker.censoredSentence('ceci est une phrase, conne!')).toBe(
    'ceci est une phrase, *****!',
  );
});

test('censoredSentence handles mixed case', () => {
  expect(ProfanityChecker.censoredSentence('Ceci est une Salope')).toBe(
    'ceci est une ******',
  );
});

test('censoredSentence handles bad words at the start', () => {
  expect(ProfanityChecker.censoredSentence('salope est ici')).toBe(
    '****** est ici',
  );
});

test('censoredSentence handles bad words at the end', () => {
  expect(ProfanityChecker.censoredSentence('ici est une pute')).toBe(
    'ici est une ****',
  );
});

test('censoredSentence handles consecutive bad words', () => {
  expect(ProfanityChecker.censoredSentence('salope pute')).toBe('****** ****');
});

test('censoredSentence handles empty string', () => {
  expect(ProfanityChecker.censoredSentence('')).toBe('');
});

test('censoredSentence handles only bad words', () => {
  expect(ProfanityChecker.censoredSentence('salope pute con')).toBe(
    '****** **** ***',
  );
});

test('censoredSentence handles mixed languages', () => {
  expect(ProfanityChecker.censoredSentence('this is a salope')).toBe(
    'this is a ******',
  );
});

test('censoredSentence handles special characters', () => {
  expect(
    ProfanityChecker.censoredSentence('ceci est une phrase sale> pute !'),
  ).toBe('ceci est une phrase sale **** !');
});

test('censoredSentence handles numbers', () => {
  expect(
    ProfanityChecker.censoredSentence('ceci est une phrase 1234 con'),
  ).toBe('ceci est une phrase 1234 ***');
});

test('censoredSentence handles multiple spaces', () => {
  expect(
    ProfanityChecker.censoredSentence(
      'ceci    est    une    phrase    connards',
    ),
  ).toBe('ceci est une phrase connards');
});

test('listBadWords returns the correct list of bad words', () => {
  const badWordsList = ProfanityChecker.listBadWords();
  expect(badWordsList).toEqual(
    expect.arrayContaining(['salope', 'putain de merde', 'con', 'sale pute']),
  );
});

test('listWhiteListWords returns the correct list of whitelisted words', () => {
  const whiteListWordsList = ProfanityChecker.listWhiteListWords();
  expect(whiteListWordsList).toEqual(['merde']);
});
