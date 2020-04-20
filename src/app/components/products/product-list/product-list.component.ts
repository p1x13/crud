import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
//services

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  constructor(
    private productService : ProductService,
    public toastr : ToastrService
  ) { }

  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  onEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
  }
  onDelete($key: string){
    if(confirm('Are you sure yo wan´t to delete it?')){
    this.productService.deleteProduct($key);
    this.toastr.success('Suceesfull Operation', 'Product Deleted')
    }
  }

}
