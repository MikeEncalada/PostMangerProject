import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { PostRepository } from '../../core/config/model/post.repository';
import { PostDataSource } from '../../core/config/model/post.datasource';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { SpeedDial } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    SharedModule ,
    CardModule,
    SpeedDial,
    ToastModule,
    TooltipModule
  ],
  providers: [PostRepository, PostDataSource, provideHttpClient(withInterceptorsFromDi()), MessageService]
})
export class PublicModule { }
