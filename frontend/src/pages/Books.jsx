import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Books = () => {
    // Simpan senarai semua buku yang diterima dari backend.
    const [books, setBooks] = useState([]);

    // Ambil data buku sekali sahaja semasa komponen mula-mula dipaparkan.
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    /*
      Penerangan penuh:
      1) State `books` bermula sebagai array kosong.
      2) Dalam `useEffect` (dependency `[]`), fungsi `fetchAllBooks` dipanggil sekali
         ketika komponen mount.
      3) Fungsi ini request data dari endpoint GET /books.
      4) Bila response berjaya, `setBooks(res.data)` simpan data ke state supaya UI render semula.
      5) Dalam bahagian return, `books.map(...)` paparkan setiap buku (cover, title, desc).
      6) Butang "Add New Book" bawa user ke route `/add` untuk tambah buku baru.
    */
    return (
        <div>
            <h1>Rith Books</h1>
            <div className="books">
                 {books.map((book) => (
                <div className="book" key={book.id}>
                {book.cover && <img src={book.cover} alt=""/>}
                <h2>{book.title}</h2>
                <p>{book.decs}</p>
                <button className="update">Update</button>
                <button className="delete">Delete</button>
                </div>
            ))}
            </div>
            <button><Link to="/add">Add New Book</Link></button>
        </div>
    );
    
};


export default Books;