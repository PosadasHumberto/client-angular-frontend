import { Component,OnInit } from '@angular/core';
import {Cliente} from "./cliente";
import {ClienteService} from "./cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  //atributos
  public cliente : Cliente = new Cliente();  //asignamos el formulario a un objeto Cliente declarando un atributo del tipo Cliente
  public titulo : String = "Formulaire Client";
  public router : Router;
  public activatedRoute : ActivatedRoute;
  public errores : String[];

  constructor(public clienteService : ClienteService, router : Router, activatedRoute : ActivatedRoute) {
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(){
    this.cargarCliente();
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Nouveau Client',
          `Le client ${cliente.nombre} a été crée avec success`,
          'success');
      }, //que pasa si en el clienteService.create algo sale mal o se lanza un error desde el clienteService.create()
        err => {
        //guardamos en el arreglo errores la lista de errores lanzados por el clienteService.create().
          this.errores = err.error.errors as String[];
          console.error('Code d\'erreur depuis le Back-end: ' + err.status);
          console.error(err.error.errors);
        }
    );
  }

  public cargarCliente() : void {
    this.activatedRoute.params.subscribe( params => { //el método params devuelve un observable de tipo Params, vamos a suscribir un observador que este observando cuando obtengamos el id
      let id = params['id'];    //recuperamos el id de los parametros de la ruta en una variable id
      if (id){    //si el id existe entonces llamamos al método getCliente pasandole el id
        this.clienteService.getCliente(id).subscribe(clienteObtenido => this.cliente = clienteObtenido); //el método getCliente(id) devuelve un Observable<Cliente> por lo tanto suscribimos un observador el cual va a asignar el clienteObtenido de la consulta al aributo cliente
      }
    });
  }

  public update() : void{
    this.clienteService.update(this.cliente)  //el método update de clienteService devuelve u observable al cual le suscribimos un observador el cual va a dirijir el flujo hacia la ruta /clientes ademas de lanzar la alerta SweetAlert2
      .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          `Client mis à jour`,
          `Le client ${cliente.nombre} a été mis à jour`,
          'success');
      }, //que pasa si en el clienteService.create algo sale mal o se lanza un error desde el clienteService.create()
        err => {
        //guardamos en el arreglo errores la lista de errores lanzados por el clienteService.create().
        this.errores = err.error.errors as String[];
        console.error('Code d\'erreur depuis le Back-end: ' + err.status);
        console.error(err.error.errors);
      });
  }
}
