import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.css']
})
export class CampoControlErroComponent implements OnInit {

  @Input() mostrarErro : boolean;
  @Input() msgErro : { campo: string, erros: any[] };
  @Input() mudarAltura : boolean;

  constructor() { }

  ngOnInit() {
  }

  mostraMsg(){

    if(this.msgErro.campo != null){
      let campo = this.msgErro.campo; 
      if(this.msgErro.erros != null){
        const erros = this.msgErro.erros;
        const primeiraLetra = campo.slice(0, 1);
        console.log(erros);
        campo = campo.replace(primeiraLetra, primeiraLetra.toUpperCase());
        if(erros['minlength']){
          return `${campo} deve conter ao menos ${erros['minlength'].requiredLength} caracteres.`;
        } else if(erros['required'] ){
          return `${campo} é obrigatório`;
        } else if (erros['email']){
          return `${campo} inválido.`;
        } else if (erros['maxlength']){
          return `${campo} excedeu o limite de ${erros['maxlength'].requiredLength} caracteres.`;
        } else {
          return `${campo} inválido`;
        }
      } 
    }
  }

  
}
