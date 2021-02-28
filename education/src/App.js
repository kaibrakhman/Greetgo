import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import EditStudent from './components/EditStudent';
import Students from './components/Students';
import Navbar from './components/Navbar';
import './bootstrap/css/bootstrap.min.css';

import {useAuth0} from '@auth0/auth0-react';
import Profile from "./components/Profile";


function App() {

    const {isLoading} = useAuth0();
    if (isLoading)
        return <div>Loading...</div>

    return (

        <div>
            <Router>

                <Navbar/>

                <div className="container">
                    <div className="row mt-5">
                        <div className="col-12 mx-auto">
                            <Switch>

                                <Route path={`/details/:studentId`}>
                                    <EditStudent/>
                                </Route>

                                <Route path="/profile">
                                    <Profile/>
                                </Route>

                                <Route path="/">
                                    <Students/>
                                </Route>

                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
