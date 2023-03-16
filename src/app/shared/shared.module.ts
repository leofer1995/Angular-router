import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { ImgComponent } from './components/img/img.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    ReversePipe,
    HighlightDirective,
    TimeAgoPipe,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
  ],
  exports: [
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    ReversePipe,
    HighlightDirective,
    TimeAgoPipe,
  ]
})
export class SharedModule { }
