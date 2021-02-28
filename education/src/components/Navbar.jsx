import {
    Link,
} from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import {useAuth0} from "@auth0/auth0-react";


function Navbar() {
    const {user, isAuthenticated} = useAuth0();

    return (
        <div>
            <nav className="navbar navbar-light py-0 bg-primary">
                <div className="container">

                    <Link to='/' className="navbar-brand text-white">
                        Online School
                    </Link>

                    <ul className="d-inline navbar-nav me-auto">

                        <li className="nav-item list-inline-item">

                            <Link to="/" className="nav-link text-white">
                                All Students
                            </Link>

                        </li>

                    </ul>

                    <ul className="d-inline navbar-nav flex-row-reverse">
                        <li className="nav-item list-inline-item ms-auto ">

                            <Link to="LoginButton /" className="nav-link text-white ml-3">
                                <LoginButton/>
                            </Link>
                        </li>

                        <li className="nav-item list-inline-item">
                            <Link to="/profile" className="nav-link text-white font-weight-bold ml-3">
                                {isAuthenticated ? user.name : ""}
                            </Link>
                        </li>

                        <li className="nav-item list-inline-item ms-auto ml-3">
                            <Link className="nav-link text-white">
                                <LogoutButton/>
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    );

}

export default Navbar;