export const useThousandsSeparator = () => {
    return (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
};
