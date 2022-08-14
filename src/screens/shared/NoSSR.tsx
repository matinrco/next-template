import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

type noSSRProps = {
    children: ReactNode;
};

const NoSSR = (props: noSSRProps) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
});
