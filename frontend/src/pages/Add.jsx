import React from "react";
import { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {

    const [book, setBook] = useState({
        title: "",
        decs: "",
        cover: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/books", book)
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }
    console.log(book);
    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title" />
            <input type="text" placeholder="Description" onChange={handleChange} name="decs" />
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover" />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add;