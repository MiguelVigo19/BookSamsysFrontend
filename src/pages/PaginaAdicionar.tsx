import React, { useState, useEffect } from 'react';
import {  AddLivrosDto, adicionarlivro, listarautores,obterporisbn } from '../api';

import { useNavigate } from 'react-router-dom';





const AddBook: React.FC = () => {
  const [mensagem, setmensagem] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [NewBook, setbook] = useState<AddLivrosDto>({ ISBN: '', BookName: '',IdAuthor: 0 , Price: ''   });
  const navigate = useNavigate();
  const [selauthor, setauthorName] = useState<any[]>([]);

  useEffect(() => {  
    const fetchAutores = async () => {

try {
        const authors = await listarautores();
        setauthorName(authors.data);
      } catch (error) {
        console.error('Erro ', error);
        
      }
    };
    fetchAutores
    ();
  }, []);

  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    

    try {
      // Validação do ISBN
      if (!NewBook.ISBN || !NewBook.BookName || !NewBook.IdAuthor || !NewBook.Price) {
        setmensagem("Faltam campos por preencher");
        return;
      }


      // Simulação de verificação se o livro já existe no sistema
      /*
      const livroExistente = await obterporisbn(NewBook.ISBN);
      if (livroExistente !=null) {
        setmensagem("O livro já existe no sistema.");
        return;
      }*/

    await adicionarlivro(NewBook);
    setmensagem("Livro adicionado com sucesso")
    setTimeout(() => {
      navigate('/Books');
  }, 3000); // Atraso de 3 segundos (3000 ms)
    
    }catch  {
      
      setmensagem("Ocorreu um erro ao processar a solicitação.");
    }
  };
  


  

  return (
    <div>
      <h1>Adicionar Livro</h1>
      
   

      <input
      type="text"
      name="ISBN"
      placeholder="ISBN"
      value={NewBook.ISBN}
      onChange={(e)=>{
        setbook({ ...NewBook,ISBN: e.target.value });

      } }
      />  

      <input
        type="text"
        name="BookName"
        placeholder="BookName"
        value={NewBook.BookName}
        onChange={(e)=>{
          setbook({ ...NewBook,BookName: e.target.value });
  
        } }


        />
        
        <select   name="IdAuthor"   value={NewBook.IdAuthor } onChange={(e)=>{
        setbook({ ...NewBook,IdAuthor: Number( e.target.value) });
         
        

      } }>
          <option value="" >selecionar autor</option>
  {selauthor.map((autores) => {
     return(<option key={autores.id} value={autores.id}>
      {autores.name}
      

    </option>) 

    
  })}
</select>



        
       
      <input
        type="text"
        name="Price"
        placeholder="Price"
        value={NewBook.Price}
        onChange={(e)=>{
          setbook({ ...NewBook,Price:  e.target.value });
          console.log(NewBook)
  
        } }
       />
       <button onClick={handleSubmit}>Add book</button>
      {mensagem}  
        
      </div>
        
  );
};

export default AddBook;





































