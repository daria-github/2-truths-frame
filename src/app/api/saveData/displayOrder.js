export const getDisplayOrder = () => {
  const arrayOptions = ["truth1", "truth2", "lie"];
  for (let i = arrayOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayOptions[i], arrayOptions[j]] = [arrayOptions[j], arrayOptions[i]];
  }
  return arrayOptions;
};
