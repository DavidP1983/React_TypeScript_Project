import { NavLink, Link, useMatch } from "react-router-dom";

import "./header.scss";

function Header() {
	const match = useMatch('/');
	return (
		<header className="header">
			<Link to={{pathname: "/", hash: "/history"}} className="logo">
				Beauty
				<br />
				Admin
			</Link>
			<nav>
				<ul className="header__list">
					<li className="header__link">
						<NavLink  to={{pathname: "/schedule", hash: "/history"}} className={({isActive}) => isActive || match ? "header__link_active" : ""}>Schedule</NavLink>
					</li>
					<li className="header__link">
						<NavLink to={{pathname: "/history", hash: "/schedule"}} className={({isActive}) => isActive ? "header__link_active" : ""}>History</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
