import '../css/Atendimento.css'
import DataPaciente from '../componentes/DataPaciente'
import FormSintomas from '../componentes/FormSintomas'
import FormSintomasChecks from '../componentes/FormSintomasChecks'
import { Form } from 'react-bootstrap'


export default function Atendimento() {

  let pacientes = [
    {
      Name: 'Pedro Luan Maciel de Sousa',
      Bday: '28-04-2006',
      Cpf: '085.220.513-62',
      Condicao: 'Não atendido'
    },
    {
      Name: 'Ana Carolina Pereira do Nascimento',
      Bday: '17-02-2006',
      Cpf: '085.220.513-62',
      Condicao: 'Pouco doente'
    },
    {
      Name: 'Nicolas Lourenço da Silva',
      Bday: '25-05-2006',
      Cpf: '085.220.513-62',
      Condicao: 'Pouco doente'
    },
    {
      Name: 'Jhonnata Freire',
      Bday: '17-02-2006',
      Cpf: '085.220.513-62',
      Condicao: 'Muito doente'
    }

  ]


  return (
    <>
      <DataPaciente
        Name={pacientes[3].Name}
        Bday={pacientes[3].Bday}
        Condicao={pacientes[3].Condicao}
        Cpf={pacientes[3].Cpf}
      />
      <div className='bodyPage'>
      <h1 className="atendimentoPaciente">Atendimento do paciente</h1>
      <p className='atendimentoPacienteParagrafo'>Preencha os formulários a seguir e clique em "enviar" para dar o laudo do paciente.</p>
        <Form className="multiForm">
          <FormSintomas />
          <FormSintomasChecks />
        <button type='submit' className="enviar">Enviar</button>
        </Form>
      </div>
    </>
  )
}
