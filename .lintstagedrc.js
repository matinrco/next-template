const path = require("path");

module.exports = {
    // Type check ts files
    "*.{ts,tsx}": () => "tsc --noEmit",

    // Prettify
    "*": (filenames) =>
        `prettier --ignore-unknown --write ${filenames.join(" ")}`,

    // Lint js/ts files
    "*.{js,jsx,ts,tsx}": (filenames) =>
        `next lint --fix --file ${filenames
            .map((f) => path.relative(process.cwd(), f))
            .join(" --file ")}`,
};
