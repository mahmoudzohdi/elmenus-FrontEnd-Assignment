// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AddCategoryComponent } from './menu/add-category/add-category.component';

// services
import { MenuService } from "./menu/menu.service";
import { LoginService } from './login/login.service';
import { AddMenuService } from './menu/shared/add-menu.service';
import { AddItemComponent } from './menu/add-item/add-item.component';
import { PermissionService } from "./shared/permission/permission.service";


@NgModule({
  declarations: [
		AppComponent,
		LoginComponent,
		MenuComponent,
		AddCategoryComponent,
		AddItemComponent,
  ],
  imports: [
		HttpModule,
		BrowserModule,
		NgSemanticModule,
		ReactiveFormsModule,
		RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
		]),
  ],
  providers: [
		MenuService,
		LoginService,
		AddMenuService,
		PermissionService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
