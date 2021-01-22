import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response =>{
      this.itens = response['content'];
      this.loadImageUrls();
    },
    error =>{}
    );
  }

  loadImageUrls(){
    for(var i=0; i<this.itens.length; i++){
      let item = this.itens[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response =>{
        item.imageURL = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
      },
      error => {}
      );
    }
  }

  showDetail(){
    this.navCtrl.push('ProdutoDetailPage');
  }
}
