export default function fixNumbers(str: string, lang?: string): string {
    switch (lang) {
        case "fa":
            return str.replace(
                /[0-9]/g,
                (w) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][+w],
            );
        default:
            return str;
    }
}
