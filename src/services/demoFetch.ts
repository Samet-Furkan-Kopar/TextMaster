import { get, postJSON } from './request';

export const getPost = () => get('https://jsonplaceholder.typicode.com/posts');
export const getPostDetail = (id: number) => get(`https://jsonplaceholder.typicode.com/posts/${id}`);
export const newPost = (data: any) => postJSON('https://jsonplaceholder.typicode.com/posts', data);
