const path = require("path");

module.exports = {
    // type check ts files
    "*.{ts,tsx}": () => "tsc --noEmit",

    // format
    "*": (filenames) =>
        `prettier --ignore-unknown --write ${filenames.join(" ")}`,

    // lint js/ts files
    "*.{js,jsx,ts,tsx}": (filenames) =>
        `next lint --fix --file ${filenames
            .map((f) => path.relative(process.cwd(), f))
            .join(" --file ")}`,

    // lint css/scss/sass files
    "*.{css,scss,sass}": (filenames) =>
        `stylelint ${filenames.join(" ")} --fix`,
};
