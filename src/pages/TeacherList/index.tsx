import React, { useState, FormEvent} from 'react';

import PageHeader from '../../components/PageHeader/index';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select'

import './styles.css';
import api from '../../services/api';


function TeacherList() {

  const [week_day, setWeekDay] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);

  function searchTeachers(e: FormEvent) {
    e.preventDefault()

    api.get('classes', { 
      params: {
        week_day,
        subject,
        time
      }
    }).then( response => {
      setTeachers(response.data)
    }).catch( err => console.log(err))
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">

          <Select 
              label="Matéria" 
              name="subject"
              value={subject}
              onChange={ e => setSubject(e.target.value)}
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

          <Select 
            label="Dia da semana" 
            name="week_day"
            value={week_day}
            onChange={ e => setWeekDay(e.target.value)}
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
            label="Horário" 
            name="time" 
            value={time}
            type="time" 
            onChange={ e => setTime(e.target.value)}
          />

          <button type="submit" onClick={searchTeachers}>Pesquisar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map( (teacher: Teacher) => {
          return <TeacherItem  key={teacher.id} teacher={teacher}/>
        })}

      </main>
    </div>
  )
}

export default TeacherList;