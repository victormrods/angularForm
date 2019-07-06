import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  // COMM: O formulário reativo é
  formulario: FormGroup;


  constructor(
    private formBuilder: FormBuilder, 
    private http : HttpClient) { }

  ngOnInit() {

    /* this.formulario = new FormGroup({
      nome: new FormControl('valor inicial'),
      email: new FormControl('valor inicial'),
    }); */

    const v = Validators;

    this.formulario = this.formBuilder.group({
      nome: [null, [v.required, v.minLength(3), v.maxLength(20)] ],
      email: [null, [v.required, v.email]],
      endereco : this.formBuilder.group({
        cep: [null, [v.required] ],
        numero: [null, [v.required]],
        complemento: [null],
        rua: [null, [v.required]],
        bairro: [null, [v.required]],
        cidade: [null, [v.required]],
        estado: [null, [v.required]]
      })
    });

  }

  verificaValidTouched(campo : string) {
    const input = this.formulario.get(campo);
    return !input.valid && input.touched;
  }

  aplicaCssErro(campo : string) {
    return {
      'has-error' : this.verificaValidTouched(campo),
      'has-feedback' : this.verificaValidTouched(campo)
    };
  }

  onSubmit() {
    console.log(this.formulario);  

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .map(res => res)
      .subscribe(dados => {
        console.log(dados);
        // this.resetar();
      }, (error: any) => alert( 'erro' ));
  }

  resetar(){
    this.formulario.reset();
  }

  msgErro(campo){

   /*  if(campo != null){
      const cp = this.formulario.get(`${campo}`);
      if(cp.errors != null){
        switch (campo) {
          case 'nome' :
              if(cp.value !== null){
                if(cp.errors['minlength']){
                  return 'Nome deve conter ao menos 3 caracteres.'
                } else if (cp.errors['maxlength']){
                  return 'Nome excedeu o número máximo de 20 caracteres.'
                }
              }
              return 'Nome é obrigatório';
          case 'email' :
              if( cp.errors['email'] && cp.value !== null){
                return 'Email inválido';
              }
            return 'Email é obrigatório';
          default :
            console.log('deu merda');
        } 
    }
  } */

  if(campo != null){
    const cp = this.formulario.get(`${campo}`);
    const res = {
      'campo' : campo,
      'erros' : cp.errors
    }
    return res;
  }

}

}
