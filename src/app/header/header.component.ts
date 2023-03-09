import {Component} from "@angular/core";

//la diferencia entre cualquier tipo de clase en angular es su decorador. (@Component en este caso)
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})
export class HeaderComponent {    //export permite poder exportar esta clase para que se pueda registrar en el contenedor de Angular (app.module.ts) y usarse en otros puntos de nuestra apicacion.

  title: string = 'App Angular'

}
