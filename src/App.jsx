import Body from "./Components/Body"
import Header from "./Components/Header"
import { ToastContainer} from 'react-toastify';

function App() {
	return (
		<section className="bg-slate-800 min-w-full min-h-svh flex-col justify-center items-center px-10 pt-10 md:px-20">
			<div className="flex-grow pb-5">
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
				theme="light"
				transition:Bounce
			/>

			<ToastContainer />
		</section>
	)
}

export default App