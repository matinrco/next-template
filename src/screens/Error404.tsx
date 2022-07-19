import React, { ReactElement } from "react";
import { useTranslation } from "next-i18next";

const Error404 = (): ReactElement => {
    const { t } = useTranslation(["error404", "common"]);

    return <div>{t("title")}</div>;
};

export default Error404;
