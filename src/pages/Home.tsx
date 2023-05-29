import '../css/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import CadPaciente from '../Modal/CadPaciente'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import '../css/Global.css'
import { TfiArrowRight } from "react-icons/tfi";
import { Link } from 'react-router-dom'
import Footer from '../componentes/Footer'




export default function Home () {
  const [itens, setItens] = useState([])
  const itensPerPages = 5
  const [currentPages, setCurrentPages] = useState(0)
  const pages = Math.ceil(itens.length / itensPerPages)
  const startIndex = currentPages * itensPerPages
  const endIndex = startIndex + itensPerPages
  const currentItens = itens.slice(startIndex, endIndex)


 useEffect(() => {
  var config = {
    method: 'get',
  maxBodyLength: Infinity,
    url: 'https://jsonplaceholder.typicode.com/users',
    headers: { 
      'Accept': 'application/json'
    }
  };
  
  axios(config)
  .then(function (response) {
    setItens(response.data);
  })
  .catch(function (error) {
    console.log(error.message);
  });
  
 }, [])
  

  return (
    
        <>
          <div className='header'>
            <h1 className='title'>Coronavirus Self Checker</h1>
            <p className='paragrafo'>Sistema médico contra o Covid-19</p>
        </div>
        <div className="body">
          
        <CadPaciente />
<h1 id='tableTitle'>Tabela de pacientes</h1>
<Table bordered hover  size='sm' responsive='sm' className='tabelaResponsiva'>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Username</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
      {currentItens.map(item => {
          return (
            <tr>
          <td>{item['id']}</td>
          <td>{item['name']}</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@fat</td>
          <td> <Link to={'/atendimento'}> <button style={{
            textAlign: 'center',
            width: '100%',
            border: 'none',
            backgroundColor: 'transparent',
            height: '100%'
          }}> <TfiArrowRight /> </button></Link> </td>
        </tr>
          )
        })}
      </tbody>
    </Table>
    <div className='paginationButtons'>
          {Array.from(Array(pages), (itens, index ) => {
            return <button id='pagination' value={index} onClick={(e) => setCurrentPages(Number(e.target.value))}>{index + 1}{itens}</button>
          })}
        </div>
      </div>
      <Footer />
        </>
  )
}
