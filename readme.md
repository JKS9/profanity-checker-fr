# French Profanity Filter

French Profanity Filter is a lightweight and easy-to-use Node.js module to detect and filter offensive words (profanity, insults) in French sentences. Ideal for chat applications, comment moderation, and any service that requires clean user-generated content.

## Installation

To install this module, use npm :

```bash
npm i profanity-checker-fr
```

## Use

### Import

To use the coarseness filter, import the classes `ProfanityConfig` and `ProfanityChecker` :

```typescript
import { ProfanityConfig, ProfanityChecker } from 'profanity-checker-fr';
```

### Detection of forbidden words

To check whether a sentence contains forbidden words, use the method `hasBadWords` :

```typescript
const sentence: string = "this is a sentence with a forbidden word 'salope'";
const containsBadWords: boolean = ProfanityChecker.hasBadWords(sentence);

console.log(containsBadWords); // Displays true or false
```

### Censorship of forbidden words

To censor forbidden words in a sentence, use the method `censoredSentence` :

```typescript
const sentence: string = "this is a sentence with a forbidden word 'con'";
const censored: string = ProfanityChecker.censoredSentence(sentence);
console.log(censored); // Display the sentence with the censored words

// this is a sentence with a forbidden word '***'
```

### Global Configuration

You can change the censor character and add forbidden words or whitelist words:

```typescript
// Configure the global settings
ProfanityConfig.changeCensoredWords('$'); // string
ProfanityConfig.addBadWords(['test', 'example']); // string or string[]
ProfanityConfig.addWhiteList(['example']); // string or string[]
```

### Example

```typescript
import { ProfanityConfig, ProfanityChecker } from 'profanity-checker-fr';

// Configure global settings
ProfanityConfig.changeCensoredWords('$'); // string
ProfanityConfig.addBadWords(['test', 'example']); // string or string[]
ProfanityConfig.addWhiteList(['test']); // string or string[]

// Check and censor a sentence
const sentence: string = 'This is a bad example test con';
console.log(ProfanityChecker.hasBadWords(sentence)); // true or false
console.log(ProfanityChecker.censoredSentence(sentence)); // This is a bad $$$$$$$ test $$$

// Delete words
ProfanityConfig.changeCensoredWords('$'); // string
ProfanityConfig.deleteBadWords(['test', 'example']); // string or string[]
ProfanityConfig.deleteWhiteList(['test']); // string or string[]

// Check and censor a sentence
const sentence: string = 'This is a bad example test con';
console.log(ProfanityChecker.hasBadWords(sentence)); // true or false
console.log(ProfanityChecker.censoredSentence(sentence)); // This is a bad example test $$$
```

## Features

| Method                                       | Description                                                                                                           |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `hasBadWords(sentence: string): boolean`     | This method takes a sentence as input and returns `true` if the sentence contains forbidden words, otherwise `false`. |
| `censoredSentence(sentence: string): string` | This method takes a sentence as input and returns the sentence with the forbidden words replaced by asterisks (`*`).  |
| `listbadWords(): string[]`                   | This method returns all the bad words currently in the list.                                                          |
| `listWhiteListWords(): string[]`             | This method returns all the words in the whitelist.                                                                   |
| `changeCensoredWords(): string`              | This method changes the censorship symbol in the sentences.                                                           |
| `addBadWords(): (string OR string[])`        | This method adds new words to the list of forbidden words.                                                            |
| `deleteBadWords(): string OR string[]`       | This method deletes words to the list of forbidden words.                                                             |
| `addWhiteList(): string OR string[]`         | This method adds new words to the list of words in the whitelist.                                                     |
| `deleteWhiteList(): string OR string[]`      | This method deletes words to the list of words in the whitelist.                                                      |

## License

This project is licensed by MIT.
