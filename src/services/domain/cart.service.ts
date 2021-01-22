import { Injectable } from "@angular/core";
import { Cart } from "../../models/Cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService{

    constructor(public storage : StorageService){
    }

    creatOrClearCart() : Cart{
        let cart : Cart = {itens: []};
        this.storage.setCart(cart);

        return cart;
    }

    getCart() : Cart{
        let cart : Cart = this.storage.getCart();
        if(cart == null){
            cart = this.creatOrClearCart();
        }

        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(p => p.produto.id == produto.id);

        if(position == -1){
            cart.itens.push({quantidade: 1, produto: produto});
        }

        this.storage.setCart(cart);
        
        return cart;
    }
}