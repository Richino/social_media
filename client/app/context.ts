"use client";
import { createContext, useState } from "react";

export const App = createContext<any>({
	post: false,
	setPost: () => {},
	user: { loading: true, user: {} },
	setUser: () => {},
	userProfile: { loading: true, user: {}, post: [] },
	setUserProfile: () => {},
	createPost: false,
	openCreatePost: () => {},
	userPost: {},
	setUserPost: () => {},
	changeProfile: false,
	setChangeProfile: () => {},
});

export const useMyContext = () => {
	const [post, setPost] = useState(false);
	const [user, setUser] = useState({ loading: true, user: null });
	const [userProfile, setUserProfile] = useState({ loading: true, user: null, post: [] });
	const [createPost, openCreatePost] = useState(false);
	const [userPost, setUserPost] = useState({});
	const [changeProfile, setChangeProfile] = useState(false);
	return { post, setPost, user, setUser, userProfile, setUserProfile, createPost, openCreatePost, userPost, setUserPost, changeProfile, setChangeProfile };
};
