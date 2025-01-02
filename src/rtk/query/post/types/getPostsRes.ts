export type GetPostsRes = Post[];

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
