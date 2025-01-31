export const parseString = (input: string): string[] => {
  if (!input || input.length === 0) {
    return [];
  }

  input = input.replace(/'/g, " ' ");

  const words = input.match(/[\wÀ-ÿ]+|[.,!?;:]/g) || [];

  return words.map((word) => word.trim()).filter((word) => word.length > 0);
};
