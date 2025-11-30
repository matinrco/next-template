const pluginNextVitals = require("eslint-config-next/core-web-vitals");
const pluginNextTs = require("eslint-config-next/typescript");
const pluginPrettier = require("eslint-plugin-prettier/recommended");
const pluginImport = require("eslint-plugin-import");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
    ...pluginNextVitals,
    ...pluginNextTs,
    pluginPrettier,
    {
        // custom rules
        plugins: {
            import: pluginImport,
        },
        rules: {
            // force to use only arrow function
            "no-restricted-syntax": [
                "error",
                "FunctionDeclaration",
                {
                    selector: "FunctionExpression",
                },
            ],
            // do not check error objects in try...catch  blocks
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    caughtErrors: "none",
                },
            ],
            // restrict any relative imports from parent directories
            "@typescript-eslint/no-restricted-imports": [
                "error",
                {
                    patterns: ["../*"],
                },
            ],
            // force to use "type" keyword while importing
            "@typescript-eslint/consistent-type-imports": "error",
            // force to use named exports instead of default export
            "import/no-default-export": "error",
            //
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                    ],
                    // put css modules at last
                    pathGroups: [
                        {
                            pattern: "./*.module.css",
                            group: "index",
                            position: "after",
                        },
                    ],
                    // prevent any new line between all imports
                    "newlines-between": "never",
                    warnOnUnassignedImports: true,
                },
            ],
        },
    },
    {
        files: ["src/pages/**/*.{js,jsx,ts,tsx}"],
        rules: {
            // override to allow default exports in the pages directory
            "import/no-default-export": "off",
            //
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            regex: "^@/containers(?!.*/[Pp]age$).*",
                            message:
                                "any import from '@/containers/**' that doesn't end with 'page' is restrict",
                        },
                        {
                            regex: "^@/containers(.*/[Pp]age$).*",
                            allowImportNames: ["Page"],
                        },
                    ],
                },
            ],
        },
    },
    {
        // override to allow 'require' imports in js/cjs files only in project root
        files: ["*.{js,cjs}"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
    {
        // override to allow type import in next-i18next.d.ts
        files: ["next-i18next.d.ts"],
        rules: {
            "@typescript-eslint/consistent-type-imports": "off",
        },
    },
];
