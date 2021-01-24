import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItens: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {
      this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItens = this.cartService.getCart().itens;
    this.clienteService.findById(this.pedido.cliente.id)
    .subscribe(response =>{
      this.cliente = response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
    },
    error =>{
      this.navCtrl.setRoot('HomePage');
    }
    );
  }

  private findEndereco(id: string, enderecos: EnderecoDTO[]) : EnderecoDTO{
    let position = enderecos.findIndex(x => x.id == id);

    return enderecos[position];
  }

  total(){
    return this.cartService.total();
  }

  checkout(){
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.creatOrClearCart();
        this.codPedido = this.extractId(response.headers.get('location'));
      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      }
      );
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  private extractId(location: string) : string{
    let positon = location.lastIndexOf('/');

    return location.substring(positon+1, location.length);
  }
}
