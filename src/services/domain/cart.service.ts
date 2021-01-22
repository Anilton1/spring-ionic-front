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

    removeProduto(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(p => p.produto.id == produto.id);

        if(position != 1){
            cart.itens.splice(position, 1);
        }

        this.storage.setCart(cart);
        
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(p => p.produto.id == produto.id);

        if(position != 1){
            cart.itens[position].quantidade++;
        }

        this.storage.setCart(cart);
        
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(p => p.produto.id == produto.id);

        if(position != 1){
            cart.itens[position].quantidade--;

            if(cart.itens[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }

        this.storage.setCart(cart);
        
        return cart;
    }

    total() : number{
        let cart = this.storage.getCart();
        let soma = 0;
        for(var i=0; i<cart.itens.length; i++){
            let preco = cart.itens[i].produto.preco;
            let qtd = cart.itens[i].quantidade;
            soma += preco * qtd;
        }
        return soma;
    }
}