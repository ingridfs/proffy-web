import React from "react";
import PageHeader from "../../components/PageHeader/index";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from '../../assets/images/icons/warning.svg';

import "./styles.css";

function TeacherForm() {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />
      
      <main>
        <fieldset>
          <legend>Seus Dados</legend>

          <Input label="Nome Completo" name="name" />
          <Input label="Link da sua foto" name="avatar" />
          <Input label="Whatsapp" name="whatsapp" />

          <Textarea label="Biografia" name="biografy" />

        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select label="Matéria" name="subject" />
          <Input label="Custo da sua hora por aula" name="cost"/>

        </fieldset>
        
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante"/>
            Importante <br />
            Preencha todos os dados
          </p>
          <button type="button">
            Salvar cadastro
          </button>
        </footer>
      </main>
    </div>
  );
}

export default TeacherForm;
