import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/PaginiInicial';
import ListBooks from './pages/PaginiListar';
import AddBook from './pages/PaginaAdicionar';
import UpdateBook from './pages/PaginiAtualizar';
import DeleteBook from './pages/PaginaApagar';
import GetByISBN from './pages/Pagina_obterporisbn';
import './App.css';
import AddAuthores from './pages/PaginaAdicionarAutores';




const App: React.FC = () => {
  return (
    <Router>
      <nav>
      <Link to="/">Home</Link> | 
        <Link to="/books">List Books</Link> | 
        <Link to="/books/add">Add Book</Link> | 
        <Link to="/books/update">Update Book</Link> | 
        <Link to="/books/delete">Delete Book</Link> |
        <Link to="/authors/add"> add Autores </Link>|
        <Link to="/books/getbyisbn">Search by ISBN</Link>

      </nav>

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/books" element={<ListBooks />} />
        <Route path="/books/add" element={<AddBook />} />
         <Route path="/books/update" element={<UpdateBook />} /> 
        <Route path="/books/delete" element={<DeleteBook />} />
        <Route path="/authors/add" element ={<AddAuthores/>}/>
        <Route path="/books/getbyisbn" element={<GetByISBN/>}/>
      </Routes>
    </Router>
  );
};

export default App;