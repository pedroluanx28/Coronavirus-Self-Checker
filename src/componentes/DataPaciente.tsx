import '../css/Atendimento.css'
import perfil from '../Imagens/defaultImage.jpg'

type Props = {
  Name: String,
  Cpf: String,
  Bday: string,
  Condicao: String
}

export default function DataPaciente({Name, Cpf, Bday, Condicao}: Props) {
  return (
    <div className="dataPacienteHeader">
        <div className="infoPrimaria">
            <img className='fotoDoPaciente' src={perfil} alt="Foto do paciente" />
            <h5 className='nomeDoPaciente'>{Name}</h5>
        </div>

        <div className='infoSecundaria'>
            <p className='condicaoPaciente'>{Condicao}</p>
            <p className='cpfDoPaciente'>{Cpf}</p>
            <p className='dataDeNascimento'>{Bday}</p>
        </div>
    </div>
  )
}
