"use client";
import "../stylesheet/globals.css";
import { App, useMyContext } from "./context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const value = useMyContext();
	return (
		<html className="h-screen w-screen">
			<head />
			<body className="h-screen w-screen bg-white text-xs">
				<App.Provider value={value}>{children}</App.Provider>
			</body>
		</html>
	);
}
