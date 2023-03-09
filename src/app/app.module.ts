import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//declarando nuestros componentes
import { HeaderComponent } from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import {ClienteService} from "./clientes/cliente.service";
import {RouterModule, Routes} from "@angular/router";

//importando HttpClient para recuperar los clientes pasando por una API Rest
import { HttpClientModule } from "@angular/common/http";
import { FormComponent } from './clientes/form.component';
import {FormsModule} from "@angular/forms";

//definiendo las rutas de componentes de la aplicacion
const routes : Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'}, //el url raiz va a redireccionar al url /clientes
  {path: 'directivas', component: DirectivaComponent},  //el componente DirectivaComponent etsa mapeado a la url directiva
  {path: 'clientes', component: ClientesComponent},  //el componente ClientesComponent esta mapeado a la url clientes
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
