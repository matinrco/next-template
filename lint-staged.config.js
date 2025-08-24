module.exports = {
    // type check ts files
    "*.{ts,tsx}": () => "tsc --noEmit",

    // format
    "*": (filenames) =>
        `prettier --ignore-unknown --write ${filenames.join(" ")}`,

    // lint js/ts files
    "*.{js,jsx,ts,tsx}": (filenames) =>
        `eslint --report-unused-disable-directives --max-warnings 0 --fix ${filenames.join(" ")}`,

    // lint css/scss/sass files
    "*.{css,scss,sass}": (filenames) =>
        `stylelint ${filenames.join(" ")} --fix`,
};
