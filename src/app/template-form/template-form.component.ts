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

  onSubmit(formulario) {
//    console.log(form);
//    console.log(form.nome);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .map(res => res)
      .subscribe(dados => {
        console.log(dados)
        formulario.form.reset();
      }, (error : any) => alert('erro'));
    
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

  consultaCep(cep, form){

    // Nova variável "cep" somento com dígitos
    cep = cep.replace(/\D/g, '');

    // Verifica se o campo cep possui algum valor
    if (cep !== '') {

      const validaCep = /^[0-9]{8}$/;

      // Valida o formato do CEP
      if (validaCep.test(cep)) {

        this.resetaDadosForm(form)

        // Chamada http no ws
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados)
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, formulario) {

    // COMM: O set value obriga a preencher todos os campos do formulário, oq pode ser um problema dependendo de quantos campos tiver
    /* formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    }); */

    // COMM: Com o patchValue conseguimos alterar somente partes específicas do formulário, sem precisar interfirir no resto
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

    console.log(formulario)
  }


  resetaDadosForm(formulario){
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  msgErro(campo){

   if(campo != null){
     
     const res = {
       'campo' : campo.name,
       'erros' : campo.errors
      }
      console.log(res)
     return res;
   }
 
 }

}
