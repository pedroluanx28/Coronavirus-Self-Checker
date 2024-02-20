import '../css/Atendimento.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type PropsArray = {
  foto: string,
  paciente_nome: string,
  paciente_cpf: string,
  paciente_dataN: string,
  consulta: {
    result: {
      resultado_nome: string;
    }
  }
}

export default function DataPaciente() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<PropsArray>();
  const [lastConsulte, setLastConsulte] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/infoPaciente/${id}`);
        setPaciente(response.data.data);
        setLastConsulte(response.data.data.consulta)
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!paciente) {
    return <div className='dataPacienteHeader'>Carregando dados do paciente...</div>;
  }

  const symptomsLength: any = lastConsulte[lastConsulte.length - 1];
  const result = (symptomsLength?.symptoms?.length) / 14 * 100;

  let condition;

  if (!symptomsLength) {
    condition = "Não atendido";
  } else {
    if (result >= 0 && result <= 39) {
      condition = "Sintomas insuficientes";
    }
    if (result >= 40 && result <= 59) {
      condition = "Potencial Infectado";
    }
    if (result >= 60 && result <= 100) {
      condition = "Possível Infectado";
    }
  }

  return (
    <div className="dataPacienteHeader">
      <div className="infoPrimaria">
        <img className='fotoDoPaciente' src={`https://f.i.uol.com.br/fotografia/2020/02/10/15813740235e41da475cca0_1581374023_3x2_md.jpg`} alt="Foto do paciente" />
        <h5 className='nomeDoPaciente'>{paciente?.paciente_nome}</h5>
      </div>
      <div className='infoSecundaria'>
        <p className='condicaoPaciente'>{symptomsLength?.result?.resultado_nome}</p>
        <p className='cpfDoPaciente'>{paciente?.paciente_cpf}</p>
        <p className='dataDeNascimento'>{paciente?.paciente_dataN}</p>
      </div>
    </div>
  );
}
