import { ProfanityCheckerFr } from './utils.js';
import { test, expect } from 'vitest';

test('hasBadWords detects bad words', () => {
  const sentence = 'ceci est une phrase avec un mot interdit';
  expect(ProfanityCheckerFr.hasBadWords(sentence)).toBe(false);
});

test('hasBadWords detects bad words', () => {
  const sentence = "ceci est une phrase avec un mot interdit 'salope'";
  expect(ProfanityCheckerFr.hasBadWords(sentence)).toBe(true);
});

test('hasBadWords detects bad words', () => {
  const sentence = "ceci est une phrase avec un mot interdit 'putain de merde'";
  expect(ProfanityCheckerFr.hasBadWords(sentence)).toBe(true);
});

test('hasBadWords detects no bad words', () => {
  const sentence = 'ceci est une phrase propre';
  expect(ProfanityCheckerFr.hasBadWords(sentence)).toBe(false);
});

test('censoredSentence censors bad words', () => {
  const sentence = 'ceci est une phrase avec un mot con';
  const expected = 'ceci est une phrase avec un mot ***';
  expect(ProfanityCheckerFr.censoredSentence(sentence)).toBe(expected);
});

test('hasBadWords detects bad words', () => {
  const sentence = "ceci est une phrase avec un mot 'putain de merde'";
  const expected = 'ceci est une phrase avec un mot ****** de *****';
  expect(ProfanityCheckerFr.censoredSentence(sentence)).toBe(expected);
});

test('censoredSentence leaves clean sentence unchanged', () => {
  const sentence = 'ceci est une phrase propre';
  expect(ProfanityCheckerFr.censoredSentence(sentence)).toBe(sentence);
});
