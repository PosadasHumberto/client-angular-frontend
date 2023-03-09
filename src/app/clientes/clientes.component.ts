import { Component, OnInit } from '@angular/core';
import {Cliente} from "./cliente";
import {ClienteService} from "./cliente.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  //atributos
  clientes: Cliente[];  //aqui solo se declara una variable del tipo arreglo de Cliente
  private clienteService : ClienteService

  //constructores
  constructor(clienteService : ClienteService ) {
    this.clienteService = clienteService;
  }

  //métodos
  ngOnInit(){
    this.clienteService.getClientes().subscribe(  //este es al observador
      (clientes) => this.clientes = clientes
    );
  }

  delete(cliente : Cliente) : void {

    //bloque de codigo para la alerta de SweetAlert2 copiado desde su sitio web
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Êtes-vous sûr?!!?',
      text: `Voulez vous vraiment supprimer le client ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //aqui se pone el codigo que queremos ejecutar cuando se confirme la eliminacion
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            //quitando del listado de clientes al objeto cliente que se acaba de eliminar
            this.clientes = this.clientes.filter(c => c !== cliente)
          swalWithBootstrapButtons.fire(
            'Client supprimé!',
            `Client ${cliente.nombre} ${cliente.apellido} supprimé avec success.`,
            'success'
          )}
        )
      }
    })
  }

}
