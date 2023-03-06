"use client";
import { createContext, useState } from "react";

export const App = createContext<any>({
	post: false,
	setPost: () => {},
	user: { loading: true, user: {}, feed: [] },
	setUser: () => {},
	userProfile: { loading: true, user: {}, post: [] },
	setUserProfile: () => {},
	createPost: false,
	openCreatePost: () => {},
	userPost: {},
	setUserPost: () => {},
	changeProfile: false,
	setChangeProfile: () => {},
	users: [],
	setUsers: () => {},
	isOpen: false,
	setIsOpen: () => {},
	mobileNav: false,
	setMobileNav: () => {},
	notifications: { loading: true, data: [] },
	setNotifications: () => {},
	comments: [],
	setComents: () => {},
});

export const useMyContext = () => {
	const [post, setPost] = useState(false);
	const [user, setUser] = useState({ loading: true, user: null, feed: [] });
	const [userProfile, setUserProfile] = useState({
		loading: true,
		user: null,
		post: [],
	});
	const [createPost, openCreatePost] = useState(false);
	const [userPost, setUserPost] = useState({});
	const [changeProfile, setChangeProfile] = useState(false);
	const [users, setUsers] = useState([]);
	const [comments, setComments] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [mobileNav, setMobileNav] = useState(false);
	const [notifications, setNotifications] = useState({ loading: true, data: [] });
	return {
		comments,
		setComments,
		notifications,
		setNotifications,
		post,
		setPost,
		user,
		setUser,
		userProfile,
		setUserProfile,
		createPost,
		openCreatePost,
		userPost,
		setUserPost,
		changeProfile,
		setChangeProfile,
		users,
		setUsers,
		isOpen,
		setIsOpen,
		mobileNav,
		setMobileNav,
	};
};
