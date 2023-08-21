export const generateKeyword = (keyword: string) => {
  const chars = keyword.split("");
  return chars.map((_, index) => keyword.slice(0, index + 1));
};
