import { get, postJSON } from './request';

export const getPost = (data: any) => get('https://jsonplaceholder.typicode.com/posts', data);
export const getPostDetail = (id: number) => get(`https://jsonplaceholder.typicode.com/posts/${id}`);
export const newPost = (data: any) => postJSON('https://jsonplaceholder.typicode.com/posts', data);
