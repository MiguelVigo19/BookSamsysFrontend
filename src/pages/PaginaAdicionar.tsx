import React, { useState, useEffect } from 'react';
import {  AddLivrosDto, adicionarlivro, listarautores } from '../api';

import { useParams, useNavigate } from 'react-router-dom';
import { Console } from 'console';




const AddBook: React.FC = () => {
  const [mensagem, setmensagem] = useState('');
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
    await adicionarlivro(NewBook);
    navigate('/Books');
  };



  

  return (
    <div>
      <h1>Adicionar Livro</h1>
      
    <form onSubmit={handleSubmit}>

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
       <button type="submit">Add Book</button>
       
        {mensagem}  
        </form>
      </div>
        
  );
};

export default AddBook;





































