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
            case "en":
                return str
                    .replace(/[٠-٩]/g, (d) =>
                        "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString(),
                    )
                    .replace(/[۰-۹]/g, (d) =>
                        "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString(),
                    );
            default:
                return str;
        }
    };
};
