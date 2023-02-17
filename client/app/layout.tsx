"use client";
import "../stylesheet/globals.css";
import { App, useMyContext } from "./context";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const value = useMyContext();
	return (
		<html>
			<head />
			<body className="bg-neutral-100 text-xs">
				<App.Provider value={value}>{children}</App.Provider>
			</body>
		</html>
	);
}
