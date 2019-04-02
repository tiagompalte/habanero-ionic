import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProductDTO } from '../../models/product.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items : CartItem[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService: ProductService,
              public cartService: CartService) {
  }

  loadImageUrls() {
    for (const item of this.items) {
      if(item.product == null)
        continue;

      this.productService.getSmallImageFromBucket(item.product.id)
            .subscribe(response => {
              item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`;
            },
            error => {});
    }
  }

  ionViewDidLoad() {
    const cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  removeItem(product: ProductDTO) {
    this.items = this.cartService.removeProduct(product).items;
  }

  increaseQuantity(product: ProductDTO) {
    this.items = this.cartService.increaseQuantity(product).items;
  }

  decreaseQuantity(product: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(product).items;
  }

  total() : number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriesPage');
  }

}
