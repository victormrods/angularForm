import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  usuario: { nome: string, email: string} = {
    nome : '',
    email : ''
  };

  constructor(private http: HttpClient ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
    console.log(form.nome);
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error' : this.verificaValidTouched(campo),
      'has-feedback' : this.verificaValidTouched(campo)
    };
  }

  consultaCep(cep){

    // Nova variável "cep" somento com dígitos
    cep = cep.replace(/\D/g, '');

    // Verifica se o campo cep possui algum valor
    if (cep !== '') {

      const validaCep = /^[0-9]{8}$/;

      // Valida o formato do CEP
      if (validaCep.test(cep)) {
        console.log(cep)
        // Chamada http no ws
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados)
          .subscribe(dados => console.log(dados));
      }
    }

  }

}
