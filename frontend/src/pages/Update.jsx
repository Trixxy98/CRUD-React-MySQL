import React from "react";
import { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Update = () => {

    // Simpan data input buku baru dalam state.
    const [book, setBook] = useState({
        title: "",
        decs: "",
        cover: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    // Update field yang berubah berdasarkan name input.
    const handleChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    // Hantar data buku ke backend, kemudian redirect ke halaman utama.
    const handleClick = async e => {
        e.preventDefault();
        try{
            await axios.put("http://localhost:8800/books/"+bookId, book)
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    /*
      Penerangan penuh:
      1) State `book` simpan 3 nilai: title, decs, dan cover.
      2) Setiap kali user taip dalam input, `handleChange` akan update field yang betul
         menggunakan `name` input (contoh: input name="title" akan update `book.title`).
      3) Bila butang Add ditekan, `handleClick` akan:
         - halang page refresh default (e.preventDefault),
         - hantar data ke endpoint POST /books,
         - jika berjaya, bawa user balik ke route "/" untuk lihat senarai buku.
      4) Jika gagal, error akan dipaparkan di console untuk debugging.
    */
    console.log(book);
    return (
        <div className="form">
            <h1>Update Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title" />
            <input type="text" placeholder="Description" onChange={handleChange} name="decs" />
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover" />
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update;