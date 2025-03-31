import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from "../../shared/shared.module";
import { AdminDataSource } from '../../core/config/model/admin.datasource';
import { AdminRepository } from '../../core/config/model/admin.repository';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';


@NgModule({
  declarations: [
    AdminComponent,
    PostsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    Menu
  ],
  providers: [AdminDataSource, AdminRepository, provideHttpClient(withInterceptorsFromDi()),]

})
export class AdminModule { }
