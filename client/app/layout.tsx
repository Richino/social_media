"use client";
import "../stylesheet/globals.css";
import { PostContext, useMyContext } from "./context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const contextValue = useMyContext();
	return (
		<html>
			<head />
			<body className="text-xs bg-neutral-100">
				<PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
			</body>
		</html>
	);
}
