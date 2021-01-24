import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-selecao-endereco',
  templateUrl: 'selecao-endereco.html',
})
export class SelecaoEnderecoPage {

  enderecos: EnderecoDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.enderecos = [
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Mônica",
        cep: "48293822",
        cidade: {
          id: "1",
          nome: "Recife",
          estado: {
            id: "1",
            nome: "Pernambuco"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Alexandre Toledo da Silva",
        numero: "405",
        complemento: null,
        bairro: "Centro",
        cep: "88933822",
        cidade: {
          id: "3",
          nome: "Jampa",
          estado: {
            id: "2",
            nome: "Paraiba"
          }
        }
      }
    ];
  }

}
