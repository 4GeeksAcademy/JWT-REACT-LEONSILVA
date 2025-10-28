import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { useEffect } from "react";


export const Navbar = () => {

	const navigate = useNavigate()

	return (
		<nav className="navbar nav-size navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand ms-4" href="#">JWT PRACTICE</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{localStorage.getItem("isLogin") ? (
						<div>
							<button className="btn btn-primary" onClick={()=>{
								localStorage.removeItem("isLogin")
								localStorage.removeItem("token")
								localStorage.removeItem("userDataObj")
								navigate("/login")
							}}>END SESSION</button>
						</div>):(
						<ul className="navbar-nav ms-auto me-4">
							<li className="nav-item">
								<Link to={"/login"} classNameName="navbar-brand ">
									<button className="mt-2 rounded fs-5 me-4">Login</button>
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/"} className="navbar-brand ">
									<button className="mt-2 rounded fs-5">Signup</button>
								</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	);
};