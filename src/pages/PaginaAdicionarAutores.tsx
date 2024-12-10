import React, { useState, useEffect } from 'react';
import {  AddAutordto, AddLivrosDto, adicionarautor, adicionarlivro, listarautores } from '../api';

import { useParams, useNavigate } from 'react-router-dom';
import { Console } from 'console';




const AddAuthores: React.FC = () => {
  const [mensagem, setmensagem] = useState('');
  const [Newautor, setautor] = useState<AddAutordto>({ Name:'' });
  const[autores,setautorl]=useState<any[]>([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await listarautores();
        setautorl(response.data);
      } catch (error) {
        console.error('Erro ao buscar autores:', error);
      }
    };
    fetchBooks();
  }, []);


  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await adicionarautor(Newautor);
    navigate('/Autors' );
  };

  return (
    <div>
      <h1>Adicionar Autor</h1>
      
    <form onSubmit={handleSubmit}>

      <input
      type="text"
      name="Name"
      placeholder="Name"
      value={Newautor.Name}
      onChange={(e)=>{
        setautor({ ...Newautor,Name: e.target.value });
    } }
    />

       <button type="submit">Add Authores</button>
        {mensagem}


        <ul>
        {autores.map((author) => (
          <li key={author.id}> {author.name} </li>
        ))}
      </ul>

        </form>
      </div>
        
  );
};

export default AddAuthores