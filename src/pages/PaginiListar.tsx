import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {   listarlivros } from '../api';






const ListBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const[originalbooks, setOriginalBooks]=useState<any[]>([]);
  
  const [filterPrice, setFilterPrice] = useState<number | null>(null);
 




  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await listarlivros();
        setBooks(response.data);
        setOriginalBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };
    fetchBooks();
  }, []);





   // Aplica o filtro automaticamente quando `filterPrice` muda
   useEffect(() => {
    const applyFilter = () => {
      if (filterPrice !== null && !isNaN(filterPrice)) {
        setBooks((books) =>
          originalbooks.filter((book) => book.price <= filterPrice)
        );
      } else {
        const resetBooks = async () => {
          try {
            const response = await listarlivros();
            setBooks(response.data); // Restaura a lista original
          } catch (error) {
            console.error('Erro ao restaurar a lista de livros:', error);
          }
        };
        resetBooks();
      }
    };
    applyFilter();
  }, [filterPrice]);


  

  return (
    <div>
      <header className="header-gradient"> BookSamsys Librabry</header>
      
      <h1 className="title"> Lista de Livros</h1> 
      
      <p></p>
     
      
      

       {/* Input para definir o preço máximo */}
       <div>
        <label htmlFor="priceFilter">Filtrar por preço (até): </label>
        <input
          id="priceFilter"
          type="number"
          value={filterPrice !== null ? filterPrice : ''}
          onChange={(e) => setFilterPrice(Number(e.target.value))}
           />
         <button onClick={() => setFilterPrice(null)}>Limpar Filtro</button>

      </div>

      
      

      <ul>
      
        {books.map((book) => (
          <li key={book.isbn}> 
          
           <p><strong>ISBN:</strong> {book.isbn}</p> 
           <p><strong>Nome do Livro:</strong>{book.bookName}</p>   
           <p><strong>Autor:</strong> {book.authorName}</p>  
           <p><strong>Preço:</strong>{book.price}€</p>
           <p>________________________________________</p>
           </li>
           
        ))}  
      </ul>
    </div>

  );
};

export default ListBooks;









