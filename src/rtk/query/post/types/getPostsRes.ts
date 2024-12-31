export type GetPostsRes = Array<Post>;

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
