import React, { useEffect, useState } from 'react';
import { obterporisbn, excluirlivro } from '../api';
import { useParams, useNavigate } from 'react-router-dom';



const DeleteBook: React.FC = () => {
  const [isbn, setIsbn] = useState('');
  const [sms,setsms]=useState('');

  const handleDeleteBook = async () => {
    try {
      await excluirlivro(isbn);
      setsms('Livro apagado com sucesso!');
    } catch (error) {
      console.error('Erro ao apagar o livro:', error);
      setsms('Erro ao tentar apagar o livro');
    }
  };

  return (
    <div>
      <h1>Apagar Livro</h1>
      <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <button onClick={handleDeleteBook}>Apagar</button>
      {sms}
    </div>
  
  );
};

export default DeleteBook;






























/*
const DeleteBook :React.FC=() =>
    {
    const { isbn } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchBook();
    }, [isbn]);
    
    useEffect(() => {
        fetchBook();
      }, [isbn]);
    
      const fetchBook = async () => {
        const response = await obterporisbn(isbn!);
        excluirlivro(response.data);
      };
    
     

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await excluirlivro(isbn!);
        navigate('/Books');
      };
    
      return (
        <form onSubmit={handleSubmit}>

<input
      type="text"
      name="isbn"
      placeholder="isbn"
      value={isbn}
      />
       <button type="submit">Delete Book</button>
        </form>);
};
export default DeleteBook;*/



