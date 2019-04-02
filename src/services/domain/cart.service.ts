import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class CartService {

  constructor(public storage: StorageService) {}

  createOrCleanCart() : Cart {
    let cart: Cart = {items: []};
    this.storage.setCart(cart);
    return cart;
  }

  getCart() : Cart {
    let cart: Cart = this.storage.getCart();
    if(cart == null) {
      cart = this.createOrCleanCart();
    }
    return cart;
  }

  addProduct(product: ProductDTO) : Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(c => c.product.id == product.id);
    if (position == -1) {
      cart.items.push({quantity: 1, product: product});
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduct(product: ProductDTO) : Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(c => c.product.id == product.id);
    if (position != -1) {
      cart.items.splice(position, 1);
    }
    else {
      cart.items[position].quantity++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(product: ProductDTO) : Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(c => c.product.id == product.id);
    if (position != -1) {
      cart.items[position].quantity++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(product: ProductDTO) : Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(c => c.product.id == product.id);
    if (position != -1) {
      cart.items[position].quantity--;
      if(cart.items[position].quantity < 1) {
        cart.items.splice(position, 1);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total() : number {
    const cart = this.getCart();
    let sum = 0;
    for (const item of cart.items) {
      sum += item.quantity * item.product.price;
    }
    return sum;
  }

}
