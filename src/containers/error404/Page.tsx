import { useTranslation } from "next-i18next";

export const Page = () => {
    const { t } = useTranslation(["error404", "common"]);

    return <p>{t("title")}</p>;
};
