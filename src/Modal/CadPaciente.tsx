import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios'
import { FormEvent, ChangeEvent } from 'react';
import Swal from 'sweetalert2'


type Props = {
  getPatients: Function
}

export default function CadPaciente({ getPatients }: Props) {

  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState('');


  const maskIdentifier = (value: string): string => {
    const valueWithoutSpaces = value.replace(/\D/g, '');
    const maskedIdentifier = valueWithoutSpaces.slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return maskedIdentifier;
  };

  const maskPhoneNumber = (value: string): string => {
    const valueWithoutSpaces = value.replace(/\D/g, '');
    const maskedPhoneNumber = valueWithoutSpaces.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    return maskedPhoneNumber;
  };

  const handleIdentifierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedCPF = maskIdentifier(inputValue);
    setIdentifier(formattedCPF);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedTelefone = maskPhoneNumber(inputValue);
    setPhoneNumber(formattedTelefone);
  };

  const requestData = new FormData()
  requestData.append('name', name)
  requestData.append('identifier', identifier)
  requestData.append('birthdate', birthdate)
  requestData.append('phone_number', phoneNumber)
  requestData.append('image', image);

  function postData(event: FormEvent) {
    event.preventDefault()

    async function addPatient() {
      try {
        const res = await axios.post('http://covid-checker.sintegrada.com.br/api/patients', requestData)
        console.log(res.data.data)
        getPatients()
        setShow(false)
        Swal.fire({
          icon: 'success',
          title: 'Paciente Adicionado com sucesso!',
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
      } catch (err: any) {
        let p: any = document.getElementById('alertParagraph')
        p.innerHTML = 'Falha ao cadastrar! Verifique suas informações!'
        console.log('Ocoreu um erro inesperado: ' + err.message)
      }
    }
    addPatient()
  }


return (
  <>
    <div className="container">
      <button className='cadastrarPaciente' onClick={() => setShow(true)}>
        Cadastrar Paciente
      </button>
    </div>


    <Modal
      show={show}
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Cadastro de paciente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={postData}>
          <Form.Group className="mb-2" controlId="formGroupName">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" placeholder="Nome completo" />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupBirthdate">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthdate(e.target.value)} type="date" />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupBirthdate">
            <Form.Label>CPF</Form.Label>
            <Form.Control placeholder="CPF" onChange={handleIdentifierChange} type="text" value={identifier} />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupTelefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control onChange={handlePhoneNumberChange} type="text" placeholder="Telefone" value={phoneNumber} />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupImage">
            <Form.Label>Foto do paciente</Form.Label>
            <Form.Control onChange={(e: ChangeEvent<any>) => setImage(e.target?.files[0])} type="file" />
          </Form.Group>
          <div className='buttons'>
            <p id="alertParagraph"></p>
            <button type='submit' className='enviar'>Enviar</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  </>
);
}