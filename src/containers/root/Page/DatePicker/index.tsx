import { useState } from "react";
import { useRouter } from "next/router";
import { TextInput } from "@mantine/core";
import GenericDatePicker, {
    DateObject,
    type Value as GenericDatePickerValue,
} from "react-multi-date-picker";
import localeFa from "react-date-object/locales/persian_fa";
import calendarFa from "react-date-object/calendars/persian";
import localeEn from "react-date-object/locales/gregorian_en";
import calendarEn from "react-date-object/calendars/gregorian";
import styles from "./index.module.css";

export const DatePicker = () => {
    const router = useRouter();
    const minDate = new DateObject().subtract(120, "years");
    const maxDate = new DateObject().subtract(18, "years");
    const [date, setDate] = useState<GenericDatePickerValue>();

    return (
        <GenericDatePicker
            calendar={(() => {
                switch (router?.locale) {
                    case "fa":
                        return calendarFa;
                    default:
                        return calendarEn;
                }
            })()}
            locale={(() => {
                switch (router?.locale) {
                    case "fa":
                        return localeFa;
                    default:
                        return localeEn;
                }
            })()}
            className={styles.genericDatePicker}
            arrowClassName={styles.genericDatePickerArrow}
            containerClassName={styles.genericDatePickerContainer}
            calendarPosition="bottom-center"
            render={(value, openCalendar, handleValueChange) => (
                <TextInput
                    label="انتخاب سن"
                    description="سن شما باید بالای ۱۸ سال باشد"
                    value={value}
                    onClick={openCalendar}
                    onChange={handleValueChange}
                />
            )}
            onChange={setDate}
            value={date}
            currentDate={maxDate}
            minDate={minDate}
            maxDate={maxDate}
        />
    );
};
