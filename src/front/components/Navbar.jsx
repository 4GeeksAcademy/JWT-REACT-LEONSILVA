import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const Navbar = () => {

	const {store,dispatch} = useGlobalReducer()

	return (
		<nav className="navbar nav-size navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand ms-4" href="#">JWT PRACTICE</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{store.is_login ?(
						<h1>Usuario: username</h1>
					):( 		
					<ul className="navbar-nav ms-auto me-4">
						<li className="nav-item">
							<Link to={"/login"} classNameName="navbar-brand ">
								<button classNameName="mt-2 rounded">Login</button>
							</Link>
						</li>
						<li className="nav-item">
							<Link to={"/"} className="navbar-brand ">
								<button className="mt-2 rounded">Signup</button>
							</Link>
						</li>
					</ul>
					)}
					
				</div>
			</div>
		</nav>
	);
};