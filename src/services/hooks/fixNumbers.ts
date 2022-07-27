import { useRouter } from "next/router";

export const useFixNumbers = () => {
    const router = useRouter();

    return (str: string, lang: string = router?.locale || ""): string => {
        switch (lang) {
            case "fa":
                return str.replace(
                    /[0-9]/g,
                    (w) =>
                        ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][+w],
                );
            default:
                return str;
        }
    };
};
