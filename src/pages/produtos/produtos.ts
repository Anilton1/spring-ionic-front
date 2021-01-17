import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.itens = [
      {
        id: "1",
        nome: 'mouse',
        preco: 80.99
      },
      {
        id: "2",
        nome: 'teclado',
        preco: 100.00
      }
    ]
  };
}