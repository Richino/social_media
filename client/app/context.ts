"use client"
import { createContext, useState } from "react";
interface PostContext {
	post: boolean;
	setPost: (value: boolean) => void;
}

export const PostContext = createContext<PostContext>({ post: false, setPost: () => {} });

export const useMyContext = () => {
	const [post, setPost] = useState(false);
	return { post, setPost };
};
