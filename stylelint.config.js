/** @type {import('stylelint').Config} */
module.exports = {
    extends: ["stylelint-config-standard-scss"],
    rules: {
        "declaration-empty-line-before": null,
        "declaration-block-no-redundant-longhand-properties": null,
        "alpha-value-notation": null,
        "property-no-vendor-prefix": null,
        "color-function-notation": null,
        "length-zero-no-unit": null,
        "no-descending-specificity": null,
        "comment-empty-line-before": null,
        "value-keyword-case": null,
        "media-feature-range-notation": null,
        "custom-property-pattern": null,
        "custom-property-empty-line-before": null,
        "scss/no-duplicate-mixins": null,
        "scss/at-mixin-pattern": null,
        "scss/at-rule-no-unknown": null,
        "selector-class-pattern": null,
        "selector-id-pattern": null,
        "selector-not-notation": null,
        "selector-pseudo-class-no-unknown": [
            true,
            {
                ignorePseudoClasses: ["global"],
            },
        ],
    },
};
