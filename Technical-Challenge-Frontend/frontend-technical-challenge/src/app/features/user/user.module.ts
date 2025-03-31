import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { MyPostsRepository } from '../../core/config/model/myposts.repository';
import { PostDataSource } from '../../core/config/model/post.datasource';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { SpeedDial } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';


@NgModule({
  declarations: [
    UserComponent,
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    CardModule,
    ButtonModule,
    SpeedDial,
    ToastModule,
    TooltipModule,
    AvatarModule,
    Menu
  ],
  providers: [MyPostsRepository, PostDataSource, provideHttpClient(withInterceptorsFromDi()), MessageService, DialogService]
})
export class UserModule { }
