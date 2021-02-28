import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';

const Profile = () => {
    const {user, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <div>
                <img className="img-thumbnail" width="200px" src={user.picture} alt={user.name} align="right"/>
                <h2>Welcome {user.name}! </h2>
                <p>{user.email}</p>

                <p>Full data: </p>
                <JSONPretty data={user}/>
                {/* {JSON.stringify(user, null, 2)} */}
            </div>
        )
    )
}

export default Profile
