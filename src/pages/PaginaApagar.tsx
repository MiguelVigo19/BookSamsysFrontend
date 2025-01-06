import React, { useState } from 'react';
import {  excluirlivro } from '../api';
import {  useNavigate } from 'react-router-dom';




const DeleteBook: React.FC = () => {
  const [isbn, setIsbn] = useState('');
  const [sms,setsms]=useState('');
   const navigate = useNavigate();




  const handleDeleteBook = async () => {
    try {
      await excluirlivro(isbn);
      setsms('Livro apagado com sucesso!');
      setTimeout(() => {
        navigate('/Books');
    }, 3000); // Atraso de 3 segundos (3000 ms)
    
    } catch (error) {
      console.error('Erro ao apagar o livro:', error);
      setsms('Erro ao tentar apagar o livro');
    }
  };

  return (
    <div>
      <header className="header-gradient"> BookSamsys Librabry</header>
      <h1 className="title"> Apagar livro</h1> 
      
      <p></p>
      <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <button onClick={handleDeleteBook}>Apagar</button>
      {sms && <p>{sms}</p>}
    </div>
  
  );
};

export default DeleteBook;

































