import React, { FormEvent, useState } from "react";
import PageHeader from "../../components/PageHeader/index";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from 'react-router-dom';


import warningIcon from '../../assets/images/icons/warning.svg';

import "./styles.css";

function TeacherForm() {

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [statusCreateClass, setStatusCreateClass] = useState(false)

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [biografy, setBiografy] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { weekday: 0, from: '', to: ''}
  ])

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        weekday: 0, from: '', to: ''
      }
    ])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return {...scheduleItem, [field]: value};
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    setLoading(true)
    api.post('classes', 
    {
      name, 
      avatar,
      whatsapp,
      bio: biografy,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }
    ).then( response => {
        setStatusCreateClass(true)
        setLoading(false)
        history.push('/')
      
    }).catch( err => {
      console.log(err)
      setLoading(false)
      setStatusCreateClass(false)
      alert("Erro ao criar cadastro. Por favor, tente novamente. ")
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />
      
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input 
              label="Nome Completo" 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              label="Link da sua foto" 
              name="avatar"
              value={avatar} 
              onChange={(e) => setAvatar(e.target.value)} 
            />
            <Input 
              label="Whatsapp" 
              name="whatsapp" 
              value={whatsapp} 
              onChange={(e) => setWhatsapp(e.target.value)} 
              />

            <Textarea 
              label="Biografia" 
              name="biografy" 
              value={biografy} 
              onChange={(e) => setBiografy(e.target.value)} 
            />

          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select 
              label="Matéria" 
              name="subject"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              options={[
                {value: 'Artes', label: 'Artes'},
                {value: 'Literatura', label: 'Literatura'},
                {value: 'Ciências', label: 'Ciências'},
                {value: 'Biologia', label: 'Biologia'},
                {value: 'História', label: 'História'},
                {value: 'Português', label: 'Português'},
                {value: 'Matemática', label: 'Matemática'},
                {value: 'Inglês', label: 'Inglês'},
                {value: 'Física', label: 'Física'},
                {value: 'Química', label: 'Química'},
              ]} 
            />
            <Input 
              label="Custo da sua hora por aula" 
              name="cost"
              value={cost} 
              onChange={(e) => setCost(e.target.value)} 
            />

          </fieldset>
          
          <fieldset>
              <legend>
                Horários Disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo Horário
                </button>
              </legend>
              
              { scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={index} className="schedule-item">
                    <Select 
                      label="Dia da semana" 
                      name="weekday"
                      value={scheduleItem.weekday}
                      onChange={ e => setScheduleItemValue(index, 'weekday', e.target.value)}
                      options={[
                        {value: '0', label: 'Domingo'},
                        {value: '1', label: 'Segunda-feira'},
                        {value: '2', label: 'Terça-feira'},
                        {value: '3', label: 'Quarta-feira'},
                        {value: '4', label: 'Quinta-feira'},
                        {value: '5', label: 'Sexta-feira'},
                        {value: '6', label: 'Sábado'},
                      ]} 
                    />
                    <Input 
                      label="Das" 
                      name="from"
                      type="time"   
                      value={scheduleItem.from}    
                      onChange={ e => setScheduleItemValue(index, 'from', e.target.value)}
                    />
                    <Input 
                      label="Até" 
                      name="to" 
                      type="time" 
                      value={scheduleItem.to}
                      onChange={ e => setScheduleItemValue(index, 'to', e.target.value)}
                    />
                  </div>  
                );
              })}
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante"/>
            Importante <br />
            Preencha todos os dados
          </p>
          <button type="submit" className="button-primary">
            { statusCreateClass ? 'Cadastro Salvo!' : 'Salvar cadastro'}
            { loading && <div className="lds-dual-ring"></div>}
          </button>
        </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
