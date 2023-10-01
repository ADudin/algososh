const getRandomInteger = (a: number, b: number):number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArr = (minLen: number, maxLen: number, minElValue: number, maxElValue: number): number[] => {
  const randomArr: number[] = [];

  for (let i = 0; i < getRandomInteger(minLen, maxLen); i++) {
    const arrElement: number = getRandomInteger(minElValue, maxElValue);
    randomArr.push(arrElement);
  };

  return randomArr;
};