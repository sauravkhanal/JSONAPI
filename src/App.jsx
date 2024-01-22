import Body from "./Components/Body"
import Header from "./Components/Header"

function App() {
	return (
		<section className="bg-slate-800 min-w-full min-h-svh flex-col justify-center items-center px-10 pt-10 md:px-20">
			<div className="flex-grow">
				<Header />
			</div>
			<div>
				<Body />
			</div>
		</section>
	)
}

export default App