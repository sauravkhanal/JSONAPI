import { useState, useEffect } from "react";
import Body from "./Components/Body"
import Header from "./Components/Header"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

	const [colorMode, setColorMode] = useState('light');

	useEffect(() => {
		//check if user prefers dark mode
		const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		setColorMode(darkModeMediaQuery.matches ? "dark" : "light")
		darkModeMediaQuery.addEventListener("change", event => setColorMode(event.matches ? "dark" : "light"))
	}, [])

	return (
		<section className="bg-gray-100 dark:bg-black min-w-full min-h-svh flex-col justify-center items-center px-10 md:px-20">
			<div className="flex-grow py-5">
				<Header />
			</div>
			<div>
				<Body />
			</div>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={colorMode}
				transition:Slide
			/>
		</section>
	)
}

export default App