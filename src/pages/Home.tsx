import '../css/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../componentes/Footer'
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
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'

interface Item {
  paciente_nome: string;
  paciente_telefone: string;
  paciente_cpf: string;
  paciente_dataN: string;
  paciente_id: number;
}

interface LinksProps {
  next: string,
  prev: string
}



export default function Home() {
  const [itens, setItens] = useState<any>([])
  const [pagination, setPagination] = useState<any>([])
  const [links, setLinks] = useState<LinksProps | any>()
  let url = 'http://127.0.0.1:8000/api/getPacientes?page=1'
  let currentPage: Number = pagination['current_page']
  const lastPage: Number = pagination['last_page']


  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setPagination(response.data.meta);
      setLinks(response.data.links)
      setItens(response.data.data)
    } catch (error) {
      console.log('Ocorreu um erro ao buscar os dados da API:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  function nextPage() {
    url = links.next
    fetchData()
  }

  function prevPage() {
    url = links.prev
    fetchData()
  }

  return (

    <>
      <main className='mainHome'>
        <div className='header'>
          <h1 className='title'>Coronavirus Self Checker</h1>
          <p className='paragrafo'>Sistema médico contra o Covid-19</p>
        </div>
        <div className="body">
          <CadPaciente getPatients={fetchData} />
          <h1 id='tableTitle'>Tabela de pacientes</h1>
          <div className='paginationButtons'>
            <button className='buttonPagination' onClick={prevPage}><MdOutlineNavigateBefore /> Anterior</button>
            <h5 style={{ display: 'inline-block' }}>{currentPage == undefined ? "1/1" : currentPage + '/' + lastPage}</h5>
            <button className='buttonPagination' onClick={nextPage}>Próxima <MdOutlineNavigateNext /></button>
          </div>
          <TableContainer id='tablePatients' component={Paper} >
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
                {itens.map((item: Item) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">{item['paciente_nome']}</TableCell>
                      <TableCell>{item['paciente_telefone']}</TableCell>
                      <TableCell>{item['paciente_cpf']}</TableCell>
                      <TableCell>{dayjs().year() - dayjs(item['paciente_dataN']).year() + ' anos'}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <Link to={`/Coronavirus-Self-Checker/atendimento/${item['paciente_id']}`}>
                          <button className='botaoHomeTable'> <ImArrowRight /> </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Footer/>
      </main>
    </>
  )
}
