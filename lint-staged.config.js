module.exports = {
  '*.{js,ts,tsx}': (filenames) => {
    const files = filenames.join(' ');
    const commands = [
      `yarn import-sort --write ${files}`,
      `yarn eslint --cache ${files} --fix`,
    ];
    return commands;
  },
  '*.{md}': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
