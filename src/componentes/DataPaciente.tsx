import '../css/Atendimento.css'
import image from '../Imagens/defaultImage.jpg'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function DataPaciente() {
  const { id } = useParams()
  const [paciente, setPaciente] = useState<any>();

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

  axios
    .post('http://covid-checker.sintegrada.com.br/api/attendance', {
      patient_id: 49,
      temperature: 37,
      systolic_pressure: 100,
      diastolic_pressure: 80,
      respiratory_rate: 50,
      pulse: 66,
      symptoms: [
        5,
        10,
        12,
        2,
        3
      ]
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err.message))

  if (!paciente) {
    return <div className='dataPacienteHeader'>Loading...</div>;
  }

  return (
    <div className="dataPacienteHeader">
        <div className="infoPrimaria">
            <img className='fotoDoPaciente' src={image} alt="Foto do paciente" />
            <h5 className='nomeDoPaciente'>{paciente.name}</h5>
        </div>

        <div className='infoSecundaria'>
            <p className='condicaoPaciente'>Não atendido</p>
            <p className='cpfDoPaciente'>{paciente.identifier}</p>
            <p className='dataDeNascimento'>{paciente.birthdate}</p>
        </div>
    </div>
  )
}
