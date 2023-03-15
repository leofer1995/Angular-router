import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId!: string | null ;
  products: Product[] = [];
  productId: string | null = null;
  limit = 10;
  offset = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if(this.categoryId)
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
          return [];
          })
      ).subscribe(data => {
        this.products = data;
      })

      this.activeRoute.queryParamMap.subscribe(params => {
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
