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
          <li key={book.isbn}> 
          
           <p><strong>ISBN:</strong> {book.isbn}</p> 
           <p><strong>Nome do Livro:</strong>{book.bookName}</p>   
           <p><strong>Autor:</strong> {book.authorName}</p>  
           <p><strong>ID do Autor:</strong>{book.idAuthor}</p>  
           <p><strong>Preço:</strong>{book.price}€</p>
           <p>________________________________________</p>
           </li>
           
        ))}
      </ul>
    </div>
  );
};

export default ListBooks;




