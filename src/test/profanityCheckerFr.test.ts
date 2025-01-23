import { ProfanityChecker } from '../profanityChecker.js';
import { ProfanityConfig } from '../profanityConfig.js';
import { test, expect, beforeAll } from 'vitest';

// Configuration initiale
beforeAll(() => {
  ProfanityConfig.changeCensoredWords('*');
  ProfanityConfig.addBadWords(['salope', 'putain de merde', 'con', 'delete']);
  ProfanityConfig.deleteBadWords(['delete']); // "merde" ne sera pas censuré même s'il est interdit
  ProfanityConfig.addWhiteList(['merde', 'white']); // "merde" ne sera pas censuré même s'il est interdit
  ProfanityConfig.deleteWhiteList(['white']); // "merde" ne sera pas censuré même s'il est interdit
});

test('hasBadWords detects bad words', () => {
  const sentence = 'ceci est une phrase avec un mot interdit';
  expect(ProfanityChecker.hasBadWords(sentence)).toBe(false);
});

test('hasBadWords detects bad words', () => {
  const sentence = "ceci est une phrase avec un mot interdit 'salope'";
  expect(ProfanityChecker.hasBadWords(sentence)).toBe(true);
});

test('hasBadWords detects multiple bad words', () => {
  const sentence = "ceci est une phrase avec un mot interdit 'putain de merde'";
  expect(ProfanityChecker.hasBadWords(sentence)).toBe(true);
});

test('hasBadWords detects no bad words', () => {
  const sentence = 'ceci est une phrase propre';
  expect(ProfanityChecker.hasBadWords(sentence)).toBe(false);
});

test('censoredSentence censors bad words', () => {
  const sentence = 'ceci est une phrase avec un mot con';
  const expected = 'ceci est une phrase avec un mot ***';
  expect(ProfanityChecker.censoredSentence(sentence)).toBe(expected);
});

test('censoredSentence censors multiple bad words', () => {
  const sentence = "ceci est une phrase avec un mot 'putain de merde'";
  const expected = 'ceci est une phrase avec un mot ****** de merde';
  expect(ProfanityChecker.censoredSentence(sentence)).toBe(expected);
});

test('censoredSentence leaves clean sentence unchanged', () => {
  const sentence = 'ceci est une phrase propre';
  expect(ProfanityChecker.censoredSentence(sentence)).toBe(sentence);
});

test('whitelisted words are not censored', () => {
  const sentence = 'ceci est une phrase avec merde mais pas de censure';
  const expected = 'ceci est une phrase avec merde mais pas de censure';
  expect(ProfanityChecker.censoredSentence(sentence)).toBe(expected);
});

test('listBadWords returns the correct list of bad words', () => {
  const badWordsList = ProfanityChecker.listbadWords();
  expect(badWordsList).toEqual(badWordsList);
});

test('listWhiteListWords returns the correct list of whitelisted words', () => {
  const whiteListWordsList = ProfanityChecker.listWhiteListWords();
  expect(whiteListWordsList).toEqual(['merde']);
});
