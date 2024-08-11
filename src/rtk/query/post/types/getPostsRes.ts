export interface GetPostsRes extends Array<Post> {}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
