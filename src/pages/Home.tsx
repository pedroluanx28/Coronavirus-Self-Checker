import '../css/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import CadPaciente from '../Modal/CadPaciente'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import '../css/Global.css'
import { TfiArrowRight } from "react-icons/tfi";
import { Link } from 'react-router-dom'




export default function Home() {
  const [itens, setItens] = useState([])
  const itensPerPages = 5
  const [currentPages, setCurrentPages] = useState(0)
  const pages = Math.ceil(itens.length / itensPerPages)
  const startIndex = currentPages * itensPerPages
  const endIndex = startIndex + itensPerPages
  const currentItens = itens.slice(startIndex, endIndex)


  useEffect(() => {
    axios
      .get('http://covid-checker.sintegrada.com.br/api/patients')
      .then(res => setItens(res.data.data))
      .catch(err => console.log(err.message))

  }, [])



  return (

    <>
      <main className='mainHome'>
        <div className='header'>
          <h1 className='title'>Coronavirus Self Checker</h1>
          <p className='paragrafo'>Sistema médico contra o Covid-19</p>
        </div>
        <div className="body">

          <CadPaciente />
          <h1 id='tableTitle'>Tabela de pacientes</h1>
          <Table bordered hover size='sm' responsive='sm' className='tabelaResponsiva'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Condição</th>
                <th>CPF</th>
                <th>Idade</th>
                <th style={{textAlign: 'center'}}>Atendimento</th>
              </tr>
            </thead>
            <tbody>
              {currentItens.map((item) => {
                return (
                  <tr>
                    <td>{item['id']}</td>
                    <td>{item['name']}</td>
                    <td>{item['phone_number']}</td>
                    <td>{item['identifier']}</td>
                    <td>{item['birthdate']}</td>
                    <td> <Link to={`/atendimento/${item['id']}`}> <button style={{
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
            {Array.from(Array(pages), (itens, index) => {
              return <button id='pagination' value={index} onClick={(e) => setCurrentPages(Number(e.target.value))}>{index + 1}{itens}</button>
            })}
          </div>
        </div>
      </main>
    </>
  )
}
