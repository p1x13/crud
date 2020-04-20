import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
//services
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr'
//product Class
import { Product } from 'src/app/models/product';
import { from } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    public productService : ProductService,
    public toastr : ToastrService,
    
    ) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.resetForm();
    
  }

  onSubmit(productForm: NgForm)
  {
    if(productForm.value.$key == null)
    this.productService.insertProduct(productForm.value);    
    else
    this.productService.updateProduct(productForm.value);
    this.resetForm(productForm);
    this.toastr.success('Succesful Operation','Succesful Operation')
  }

  resetForm(productForm? : NgForm)
  {
    if(productForm != null)
      productForm.reset();
      this.productService.selectedProduct = new Product();
  }
}
