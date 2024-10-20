import type { NextApiRequest, NextApiResponse } from "next";

const handler = (
    req: NextApiRequest,
    res: NextApiResponse<{
        name: string;
    }>,
) => {
    res.status(200).json({ name: "John Doe" });
};

export default handler;
