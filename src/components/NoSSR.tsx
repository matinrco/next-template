import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";

const NoSSR = ({ children }: PropsWithChildren) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
});
