import React, {useState, useEffect} from 'react';

import {
    useParams
} from "react-router-dom";

import {useAuth0} from "@auth0/auth0-react";



function EditStudent() {

    const {isAuthenticated} = useAuth0();

    let {studentId} = useParams();

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getStudent(studentId);
    }, []);

    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleAgeChange = event => {
        setAge(event.target.value);
    }


    const handleSubmit = event => {
        const inputData = {id, name, age};
        saveStudent(inputData);
        event.preventDefault();

    }

    async function setData(data) {
        setId(data.id);
        setName(data.name);
        setAge(data.age);
    }

    async function saveStudent(data) {
        const response = await fetch("http://localhost:8080/api/saveStudent", {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        let messData = await response.json();
        setMessage(messData.id ? "Student Updated" : "Error");
    }

    async function getStudent(studentId) {
        let response = await fetch("http://localhost:8080/api/details/" + studentId);
        if (response.status === 200) {
            let data = await response.json();
            setData(data);
        } else {
            setMessage("404 ITEM NOT FOUND");
        }
    }

    async function toDeleteStudent() {
        const inputData = {id, name, age};
        deleteStudent(inputData);
        setName("");
        setAge(0);

    }

    async function deleteStudent(data) {
        const response = await fetch("http://localhost:8080/api/deleteStudent", {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        let messData = await response.json();
        setMessage(messData.id ? "Student Deleted" : "Error");
    }

    return (
        isAuthenticated && (
            <div className="container">
                <div className="row">
                    <div className="col-6 mx-auto">
                        <h1>{message}</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>
                                    NAME :
                                </label>
                                <input type="text" className="form-control" value={name} onChange={handleNameChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label>
                                    AGE :
                                </label>
                                <input type="number" className="form-control" value={age} onChange={handleAgeChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-outline-primary btn-sm">SAVE ITEM</button>
                                <button type="button" className="btn btn-outline-danger btn-sm ml-2"
                                        onClick={toDeleteStudent}>DELETE ITEM
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    )

}

export default EditStudent;