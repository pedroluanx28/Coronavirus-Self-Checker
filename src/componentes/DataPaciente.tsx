import '../css/Atendimento.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DataPaciente() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<any>();
  const [lastConsulte, setLastConsulte] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://covid-checker.sintegrada.com.br/api/patients/${id}`);
        setPaciente(response.data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://covid-checker.sintegrada.com.br/api/patients/${id}/attendances`)
      .then(res => setLastConsulte(res.data.data))
      .catch(err => console.log(err.message))
  }, []);

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
        <img className='fotoDoPaciente' src={`http://covid-checker.sintegrada.com.br/${paciente.image}`} alt="Foto do paciente" />
        <h5 className='nomeDoPaciente'>{paciente.name}</h5>
      </div>

      <div className='infoSecundaria'>
        <p className='condicaoPaciente'>{symptomsLength ? condition : "Não atendido"}</p>
        <p className='cpfDoPaciente'>{paciente.identifier}</p>
        <p className='dataDeNascimento'>{paciente.birthdate}</p>
      </div>
    </div>
  );
}
