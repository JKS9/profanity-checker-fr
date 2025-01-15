import { FrenchProfanityFilter } from './utils.js';
import { test, expect } from 'vitest';

test('hasBadWords detects bad words', () => {
  const sentence = 'ceci est une phrase avec un mot interdit';
  expect(FrenchProfanityFilter.hasBadWords(sentence)).toBe(false);
});

test('hasBadWords detects bad words', () => {
  const sentence = "ceci est une phrase avec un mot interdit 'salope'";
  expect(FrenchProfanityFilter.hasBadWords(sentence)).toBe(true);
});

test('hasBadWords detects no bad words', () => {
  const sentence = 'ceci est une phrase propre';
  expect(FrenchProfanityFilter.hasBadWords(sentence)).toBe(false);
});

test('censoredSentence censors bad words', () => {
  const sentence = 'ceci est une phrase avec un mot con';
  const expected = 'ceci est une phrase avec un mot ***';
  expect(FrenchProfanityFilter.censoredSentence(sentence)).toBe(expected);
});

test('censoredSentence leaves clean sentence unchanged', () => {
  const sentence = 'ceci est une phrase propre';
  expect(FrenchProfanityFilter.censoredSentence(sentence)).toBe(sentence);
});
