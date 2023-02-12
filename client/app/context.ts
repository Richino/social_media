"use client";
import { createContext, useState } from "react";

export const App = createContext<any>({
	post: false,
	setPost: () => {},
	user: { loading: true, user: {} },
	setUser: () => {},
	userProfile: { loading: true, user: {} },
	setUserProfile: () => {},
	createPost: false,
	openCreatePost: () => {},
});

export const useMyContext = () => {
	const [post, setPost] = useState(false);
	const [user, setUser] = useState({ loading: true, user: null });
	const [userProfile, setUserProfile] = useState({ loading: true, user: null, post: null });
	const [createPost, openCreatePost] = useState(false);
	return { post, setPost, user, setUser, userProfile, setUserProfile, createPost, openCreatePost };
};
