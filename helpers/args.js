const getCharByPosition = (string, position) => {
  return string.charAt(position);
}

const checkFlag = (arg) => {
  const firstLetter = getCharByPosition(arg, 0);
  return firstLetter === '-';
};

const checkValue = (arg) => {
  const firstLetter = getCharByPosition(arg, 0);
  return firstLetter !== '-';
};

const getArgs = () => {
  const [exec, file, ...args] = process.argv;
  const result = {};

  args.forEach( (arg, index) => {
    const isFlag = checkFlag(arg);
    if(!isFlag) return;

    const flag = getCharByPosition(arg, 1);
    result[flag] = true;

    const isLastIndex = (args.length - 1) === index;
    if(isLastIndex) return;

    const nextValue = args[index + 1];
    const isValue = checkValue(nextValue);
    if(isValue) result[flag] = nextValue;
  });

  return result;
};

export { getArgs };