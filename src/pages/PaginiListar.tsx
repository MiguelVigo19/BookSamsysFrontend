import React, { useEffect, useState } from 'react';

import {  listarlivros } from '../api';
 




const ListBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await listarlivros();
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}> {book.isbn} - {book.bookName} - {book.authorName} - {book.idAuthor} - {book.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListBooks;




/*

const ListBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await listarlivros();
    setBooks(response.data);
  };


  
  if (books.length === 0) {
    return <div>No books found.</div>;
  }

  return (
    <div>
      <h1>List of Books</h1>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th></th>
            <th>Title</th>
            <th></th>
            <th>Author</th>

            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.isbn}>
              <td>{book.isbn}</td>
              <td>{book.idAuthor}</td>
              <td>{book.bookName}</td>
              <td>{book.authorName}</td>
              <td>{book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;*/