import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";

export const NoSSR = dynamic(
    () => Promise.resolve(({ children }: PropsWithChildren) => <>{children}</>),
    {
        ssr: false,
    },
);
