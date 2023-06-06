import '../css/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import CadPaciente from '../Modal/CadPaciente'
import axios from 'axios'
import '../css/Global.css'
import { ImArrowRight } from "react-icons/im";
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs'




export default function Home() {
  const [itens, setItens] = useState([])
  const [pagination, setPagination] = useState<any>([])
  const perPage = pagination['per_page']
  const totalPages = pagination['last_page']


  useEffect(() => {
    axios
      .get('http://covid-checker.sintegrada.com.br/api/patients')
      .then(res => setItens(res.data.data))
      .catch(err => console.log(err.message))

    axios
      .get('http://covid-checker.sintegrada.com.br/api/patients')
      .then(res => setPagination(res.data.meta))
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
          <TableContainer component={Paper}>
            <Table style={{ minWidth: '650' }} aria-label="simple table" className='tabelaResponsiva'>
              <TableHead>
                <TableRow style={{ fontWeight: 'bolder' }}>
                  <TableCell style={{ fontWeight: 'bold' }} align="left">Nome</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="left">Telefone</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="left">CPF</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="left">Idade</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">Atendimento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itens.map((item) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">{item['name']}</TableCell>
                      <TableCell>{item['phone_number']}</TableCell>
                      <TableCell>{item['identifier']}</TableCell>
                      <TableCell>{dayjs().year() - dayjs(item['birthdate']).year() + ' anos'}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <Link to={`/atendimento/${item['id']}`}>
                          <button className='botaoHomeTable'> <ImArrowRight /> </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className='paginationButtons'>

          </div>
        </div>
      </main>
    </>
  )
}
