import '../css/Atendimento.css'
import { Form } from 'react-bootstrap'
import DataPaciente from '../componentes/DataPaciente'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react'

export default function Atendimento() {
  const [itens, setItens] = useState([])
  const [temp, setTemp] = useState<Number>()
  const [systolic, setSystolic] = useState<Number>()
  const [diastolic, setDiastolic] = useState<Number>()
  const [respiratory, setRespiratory] = useState<Number>()
  const [pulse, setPulse] = useState<Number>()
  const [symptoms, setSymptoms] = useState<Number[]>([])
  const [lastConsulte, setLastConsulte] = useState([])
  const { id } = useParams()


  function postSymptoms(event: FormEvent) {
    event.preventDefault()

    axios
      .post('http://covid-checker.sintegrada.com.br/api/attendance', {
        patient_id: Number(id),
        temperature: temp,
        systolic_pressure: systolic,
        diastolic_pressure: diastolic,
        respiratory_rate: respiratory,
        pulse: pulse,
        symptoms: symptoms
      })
      .then(res => setItens(res.data.data.symptoms))
      .catch(err => console.log(err.message))

      getAttendances()
  }
  function getAttendances() {
    axios
      .get(`http://covid-checker.sintegrada.com.br/api/attendance/200`)
      .then(res => setItens(res.data.data.symptoms))
      .catch(err => console.log(err.message))

    axios
      .get(`http://covid-checker.sintegrada.com.br/api/patients/${id}/attendances`)
      .then(res => setLastConsulte(res.data.data))
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getAttendances()
  }, [])

  return (
    <>
      <DataPaciente />
      <div className='bodyPage'>
        <h1 className="atendimentoPaciente">Atendimento do paciente</h1>
        <p className='atendimentoPacienteParagrafo'>Preencha os formulários a seguir e clique em "enviar" para dar o laudo do paciente.</p>
        <Form onSubmit={postSymptoms} className="multiForm">
          <div className="formSintomas">
            <h3 className='tituloFormSintomas'>
              Dados de saúde
            </h3>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control onChange={e => setSystolic(Number(e.target.value))} type="text" placeholder="Pressão Arterial Sistólica" required />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control onChange={e => setDiastolic(Number(e.target.value))} type="text" placeholder="Pressão Arterial Diastólica" required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setPulse(Number(e.target.value))} type="text" placeholder="Frequência Cardíaca" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setRespiratory(Number(e.target.value))} type="text" placeholder="Frequência Respiratória" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setTemp(Number(e.target.value))} type="text" placeholder="Temperatura" required />
            </Form.Group>
          </div>
          <Container className="formSintomasCheck">
            <Row>
              <h3 className="tituloFormSintomasChecks">Sintomas</h3>
              {itens.map(data => {
                const itemId = Number(data['id']);
                const isChecked = symptoms.includes(itemId);

                const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const isChecked = e.target.checked;

                  setSymptoms(prevSelected => {
                    if (isChecked) {
                      return [...prevSelected, itemId];
                    } else {
                      return prevSelected.filter(id => id !== itemId);
                    }
                  });
                }

                return (
                  <Col xs='3' sm='3' md='3' lg='3' style={{ textAlign: 'left' }}>
                    <Form.Check
                      className='checkboxInput'
                      type='checkbox'
                      value={itemId}
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <p>{data['name']}</p>
                  </Col>
                );
              })}

            </Row>
          </Container>
          <button type='submit' className="enviar">Enviar</button>
        </Form>
        <div className="lastConsulte">
          <h3 className='tituloFormSintomas'> Sintomas da última consulta </h3>
          <Container>
            <Row>
              {!lastConsulte[lastConsulte.length - 1]
                ? <p>Consultas anteriores indisponíveis!</p>
                : lastConsulte[lastConsulte.length - 1].symptoms.map(data => {
                  return (
                    <Col md='6'>
                      <p className='lastSymptoms'>
                        {data['name']}
                      </p>
                    </Col>
                  )
                })}
            </Row>
          </Container>
        </div>
      </div>
    </>
  )

}
