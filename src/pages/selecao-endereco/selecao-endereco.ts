import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-selecao-endereco',
  templateUrl: 'selecao-endereco.html',
})
export class SelecaoEnderecoPage {

  enderecos: EnderecoDTO[];
  pedido: PedidoDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public storage: StorageService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.enderecos = response['enderecos'];

        let cart = this.cartService.getCart();

        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens: cart.itens.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
        }
        },
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        }
        );
    }else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(endereco: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: endereco.id};
    console.log(this.pedido);
  }
}
