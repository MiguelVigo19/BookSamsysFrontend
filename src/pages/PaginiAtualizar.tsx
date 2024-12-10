import React, { useEffect, useState } from 'react';
import {  atualizarlivro, UpdateLivrosDto,listarautores } from '../api';
import { useParams, useNavigate } from 'react-router-dom';






const UpdateBook: React.FC = () => {
  const [mensagem, setmensagem] = useState('');

  const [Book, setbook] = useState<UpdateLivrosDto>({ ISBN: '', BookName: '',authorid: 0 , Price: ''   });

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
    await atualizarlivro(Book.ISBN,Book);
    navigate('/Books');
  };


  return (
    <div>
      <h1>Atualizar livro</h1>
      
    <form onSubmit={handleSubmit}>

      <input
      type="text"
      name="ISBN"
      placeholder="ISBN"
      value={Book.ISBN}
      onChange={(e)=>{
        setbook({ ...Book,ISBN: e.target.value });

      } }
      />  

      <input
        type="text"
        name="BookName"
        placeholder="BookName"
        value={Book.BookName}
        onChange={(e)=>{
          setbook({ ...Book,BookName: e.target.value });
  
        } }


        />
        
        <select   name="authorid"   value={Book.authorid } onChange={(e)=>{
        setbook({ ...Book,authorid: Number( e.target.value) });
         
        

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
        value={Book.Price}
        onChange={(e)=>{
          setbook({ ...Book,Price:  e.target.value });
          
  
        } }
       />
       <button type="submit">Update Book</button>
       
        {mensagem}  
        </form>
      </div>
        
  );
};
export default UpdateBook;



























