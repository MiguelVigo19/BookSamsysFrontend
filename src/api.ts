import axios from 'axios'; 
import internal from 'stream';

const api = axios.create({
  baseURL: 'http://localhost:5114/api/', // Change to your backend URL
});




 

 




export const listarlivros = () => api.get('/Books');
export const obterporisbn = (isbn: string) => api.get(`/Books/${isbn}`);
export const adicionarlivro = (book:  AddLivrosDto) => api.post('/Books', book);
export const atualizarlivro = (isbn: string, book: UpdateLivrosDto) => api.put(`/Books/${isbn}`, book);
export const excluirlivro=(isbn:string) => api.delete(`/Books/${isbn}`);
export const adicionarautor=(author: AddAutordto) => api.post('/Autors', author ) ;
export const listarautores=()=>api.get('/Autors'); 






export default api;


export interface AddLivrosDto {

  ISBN: string;
   BookName: string;
   IdAuthor:number;
   Price:string;
  
 } 


 export interface UpdateLivrosDto
 {
  ISBN: string;
   BookName :string;
   authorid:number;
   Price:string;
 }



 export interface AddAutordto  {
  
  Name: string;


 }



 export interface BookDTO{
  ISBN: string;
  BookName: string;
  AuthorName:string;
  IdAuthor:number;
  Price:string;
 


 }