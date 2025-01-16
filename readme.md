# French Profanity Filter

French Profanity Filter is a lightweight and easy-to-use Node.js module to detect and filter offensive words (profanity, insults) in French sentences. Ideal for chat applications, comment moderation, and any service that requires clean user-generated content.

## Installation

To install this module, use npm :

```bash
npm i profanity-checker-fr
```

## Use

### Import

To use the coarseness filter, import the class `ProfanityCheckerFr` :

```typescript
import { ProfanityCheckerFr } from 'profanity-checker-fr';
```

### Detection of forbidden words

To check whether a sentence contains forbidden words, use the method `hasBadWords` :

```typescript
const sentence = "this is a sentence with a forbidden word 'salope'";
const containsBadWords = ProfanityCheckerFr.hasBadWords(sentence);

console.log(containsBadWords); // Displays true or false
```

### Censorship of forbidden words

To censor forbidden words in a sentence, use the method `censoredSentence` :

```typescript
const sentence = "this is a sentence with a forbidden word 'con'";
const censored = ProfanityCheckerFr.censoredSentence(sentence);
console.log(censored); // Display the sentence with the censored words

// this is a sentence with a forbidden word '***'
```

## Features

- `hasBadWords(sentence: string): boolean`

This method takes a sentence as input and returns `true` if the sentence contains forbidden words, otherwise `false`.

- `censoredSentence(sentence: string): string`

This method takes a sentence as input and returns the sentence with the forbidden words replaced by asterisks (`*`).

## Example

```typescript
import { ProfanityCheckerFr } from 'profanity-checker-fr';

const sentence = "this is a sentence with a forbidden word 'connard'";
console.log(ProfanityCheckerFr.hasBadWords(sentence)); // Display true
console.log(ProfanityCheckerFr.censoredSentence(sentence)); // Display "this is a sentence with a forbidden word '*******'
```

## License

This project is licensed by MIT.
