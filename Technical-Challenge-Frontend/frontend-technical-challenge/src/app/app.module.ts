import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { customPreset } from './core/config/theme.confing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './features/public/public.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './core/config/guards/auth.guard';
import { AdminGuard } from './core/config/guards/admin.guard';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PublicModule,


  ],
  providers: [
    AuthGuard,
    AdminGuard,
    provideAnimationsAsync(), 
    providePrimeNG({     
      theme: {
        preset: customPreset,
        options: {
          darkModeSelector: false || 'none'
        }
      },
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
