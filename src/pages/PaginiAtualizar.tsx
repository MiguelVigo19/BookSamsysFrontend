import React, { useEffect, useState } from 'react';
import {  atualizarlivro, UpdateLivrosDto,listarautores,obterporisbn } from '../api';
import { useParams, useNavigate } from 'react-router-dom';






const UpdateBook: React.FC = () => {
  const [mensagem, setmensagem] = useState('');
    const [error, setError] = useState<string | null>(null);

  const [Book, setbook] = useState<UpdateLivrosDto>({ ISBN: '', BookName: '',authorid: 0 , Price: ''   });

  const navigate = useNavigate();
  const [selauthor, setauthorName] = useState<any[]>([]);
  const [selISBN, setISBN] = useState<any[]>([]);

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
          // Validação dos campos
          if (!Book.ISBN || !Book.BookName || !Book.authorid || !Book.Price) {
            setmensagem("Faltam campos por preencher");
            return;
          }
    
          
    
          // Simulação de verificação se o livro já existe no sistema
          const livroExistente = await obterporisbn(Book.ISBN);
          if (livroExistente ==null) {
            setmensagem("O livro não  existe no sistema.");
            return;
          }
        
    

    await atualizarlivro(Book.ISBN,Book);
    setmensagem(`livro com isbn: ${Book.ISBN} foi atualizado `)
    setTimeout(() => {
      navigate('/Books');
  }, 3000); // Atraso de 3 segundos (3000 ms)
        }
        catch (err: any) {
          setmensagem("Ocorreu um erro ao processar a solicitação.");
        }
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



























