
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { RolesGuard } from './guards/roles.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';



const routes: Routes = [
  {
    path: '',
    //canActivate: [ RoleGuard ],
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    canActivateChild: [ RolesGuard ],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadService//PreloadAllModules QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
