import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePT from '@angular/common/locales/pt';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { EventoService } from './services/evento.service';

import { AppComponent } from './app.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { LoginComponent } from './components/user/login/login.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { LoteService } from './services/lote.service';
defineLocale('pt-br', ptBrLocale);
@NgModule({
  declarations: [
      AppComponent,
      ContatosComponent,
      DashboardComponent,
      EventosComponent,
      NavComponent,
      PalestrantesComponent,
      PerfilComponent,
      TituloComponent,
      DateTimeFormatPipe,
      EventoDetalheComponent,
      EventoListaComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [
    EventoService,
    LoteService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
