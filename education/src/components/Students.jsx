import React, {useState, useEffect} from 'react';


import {useAuth0} from "@auth0/auth0-react";

function ListStudents({newStudentAddedId}) {

    const {isAuthenticated} = useAuth0();

    const [data, setData] = useState([]);

    async function loadData() {
        let response = await fetch("http://localhost:8080/api/students");
        let tableData = await response.json();
        setData(tableData);
    }

    useEffect(() => {
        loadData();
    }, [newStudentAddedId]);

    return (
        isAuthenticated && (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>AGE</th>
                        <th>EDIT</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map(row => (
                        <tr key={row.id}>
                            <td>
                                {row.id}
                            </td>
                            <td>
                                {row.name}
                            </td>
                            <td>
                                {row.age}
                            </td>
                            <td width="10%">
                                <a className="btn btn-outline-primary btn-sm" href={`/details/${row.id}`}>EDIT</a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    )

}

function Students() {
    const {isAuthenticated} = useAuth0();

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [newId, setNewId] = useState(0);
    const [message, setMessage] = useState("");

    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleAgeChange = event => {
        setAge(event.target.value);
    }


    const handleSubmit = event => {

        const inputData = {name, age}
        addStudent(inputData);
        setName("");
        setAge(0);
        event.preventDefault();

    }

    async function addStudent(data) {
        const response = await fetch("http://localhost:8080/api/addStudent", {
            method: "POST",
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
        setMessage(messData.id ? "Data Added" : "Error");
        setNewId(messData.id);
    }


    return (
        isAuthenticated && (
            <div className="container">
                <div className="row">
                    <div className="col-6 mx-auto">
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
                            <div className="form-group justify-content-lg-end">
                                <button className="btn btn-outline-primary btn-sm">ADD ITEM</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row mt-3">

                    <div className="col-12">
                        <ListStudents newStudentAddedId={newId}/>
                    </div>

                </div>
            </div>
        )
    )

}

export default Students;