import { ActivatedRoute } from '@angular/router';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  products: Product[] = [];
  productId!: string | null;
  limit = 10;
  offset = 0;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
  ) { }

 
  ngOnInit(): void {
    this.productsService.getAll(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId)
    })
  }

  onLoadMore(event: any) {
    console.log(event)
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
