import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import HistoryPage from "../../pages/history/HistoryPage";
import Page404 from "../../pages/404/404";
import AppointmentsContextProvider from "../../context/appointments/AppointmentsContext";
import "./app.scss";


const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <Page404/>,
		children: [
			{ 
				path: "/",
				element: <SchedulePage/>
			},
			{
				path: "/schedule",
				element: <SchedulePage/>
			},
			{
				path: "/history",
				element: <HistoryPage/>
			},
		]
	}
	
]);

function App() {

	return <RouterProvider router={router}/>
}

function Root() {
	return (
		<main className="board">
			<Header />
			<AppointmentsContextProvider>
				<Outlet />
			</AppointmentsContextProvider>
		</main>
	);
}

export default App;
