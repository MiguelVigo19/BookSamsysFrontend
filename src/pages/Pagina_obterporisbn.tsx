import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obterporisbn, BookDTO } from '../api';

const GetByISBN: React.FC = () => {
  const navigate = useNavigate();
  const [isbnData, setIsbnData] = useState<BookDTO>({
    ISBN: '',
    BookName: '',
    AuthorName: '',
    IdAuthor: 0,
    Price: '',
  });
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  
  
  



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isbnData.ISBN.trim()) {
      setError('Por favor, insira um ISBN válido.');
      return;
    }

    try {
      const book = await obterporisbn(isbnData.ISBN);
      setBooks(book ? [book.data] : []);
      
    }
    
    
    catch (err) {
      setError('Erro ao buscar o livro. Verifique o ISBN e tente novamente.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="isbnInput">Pesquisar por ISBN:</label>
        <input
          type="text"
          name="isbn"
          id="isbnInput"
          placeholder="ISBN"
          value={isbnData.ISBN}
          onChange={(e) =>{
            setIsbnData({ ...isbnData, ISBN: e.target.value })
          }}
        />
        <button type="submit">pesquisar por ISBN</button>
        
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {books.map((book) => (
          <li key={book.isbn}>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Nome do Livro:</strong> {book.bookName}
            </p>
            <p>
              <strong>Autor:</strong> {book.authorName}
            </p>
            <p>
              <strong>ID do Autor:</strong> {book.idAuthor}
            </p>
            <p>
              <strong>Preço:</strong> {book.price}€
            </p>
            <hr />
          </li>
        ))}
        </ul>
    </div>
  );
};

export default GetByISBN;
