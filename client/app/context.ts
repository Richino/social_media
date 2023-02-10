"use client";
import { createContext, useState } from "react";

export const App = createContext<any>({
	post: false,
	setPost: () => {},
	user: { loading: true, user: {} },
	setUser: () => {},
	userProfile: { loading: true, user: {} },
	setUserProfile: () => {},
});

export const useMyContext = () => {
	const [post, setPost] = useState(false);
	const [user, setUser] = useState({ loading: true, user: null });
	const [userProfile, setUserProfile] = useState({ loading: true, user: null, post: null });
	return { post, setPost, user, setUser, userProfile, setUserProfile };
};
