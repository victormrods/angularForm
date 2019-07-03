import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  usuario : { nome : string, email : string} = {
    nome : '',
    email : ''
  }

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form);
    console.log(form.nome)
  }

  /* validacao(campo){
    if(campo == 'nome'){
      return '!nome.valid && nome.touched'
    }
  } */

}
