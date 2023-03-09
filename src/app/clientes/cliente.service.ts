import { Injectable } from '@angular/core';
import {Cliente} from "./cliente";
import {map, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Injectable()
export class ClienteService {

  //atributos
  private router : Router;
  private http : HttpClient;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(http : HttpClient, router : Router) {
    this.http = http;
    this.router = router;
  }

  //métodos
  getClientes(): Observable<Cliente[]> {  //este es el evento u observable

    return this.http.get<Cliente[]>('https://client-spring-backend-api.herokuapp.com/api/clientes');  //la url de nuestra API Rest
  };

  create(cliente : Cliente) : Observable<Cliente> {
    return this.http.post(
      'https://client-spring-backend-api.herokuapp.com/api/clientes',
      cliente,
      {headers : this.httpHeaders}).pipe(
        map((response : any ) => response.cliente as Cliente),
        catchError(e=>{

          //tratamos errores en el formulario
          if (e.status == 400){
            return throwError(e);
          }

          //mostramos el mensaje que viene en el mapa pasado como JSON desde el Back-end
          console.error(e.error.mensaje);
          Swal.fire('Error al crear cliente', e.error.mensaje, 'error'); //en alerta

          return throwError(e);
      }));
  }

  getCliente(id) : Observable<Cliente> {
    return this.http.get<Cliente>(`https://client-spring-backend-api.herokuapp.com/api/clientes/${id}`)
      .pipe(catchError(e=>{

        //cuando un error se produce entonces vamos a redirigir hacia el listado de clientes
        this.router.navigate(['/clientes']);

        //ahora mostramos el mensaje que viene en el mapa pasado como JSON desde el Back-end
        Swal.fire('Error al editar', e.error.mensaje, 'error'); //en alerta
        console.error(e.error.mensaje);

        return throwError(e);
      }))
  }

  update(cliente : Cliente) : Observable<Cliente>{
    return this.http.put(
      `https://client-spring-backend-api.herokuapp.com/api/clientes/${cliente.id}`,
      cliente,
      {headers: this.httpHeaders})
      .pipe(
        map((response : any) => response.cliente as Cliente),
        catchError(e=>{

          //tratamos errores en el formulario
          if (e.status == 400){
            return throwError(e);
          }

          //mostramos el mensaje que viene en el mapa pasado como JSON desde el Back-end
          Swal.fire('Error al actualizar cliente', e.error.mensaje, 'error'); //en alerta
          console.error(e.error.mensaje);

          return throwError(e);
      }));
  }

  delete(id) : Observable<Cliente> {
    return this.http.delete<Cliente>(
      `https://client-spring-backend-api.herokuapp.com/api/clientes/${id}`,
      {headers: this.httpHeaders})
      .pipe(catchError(e=>{

        //mostramos el mensaje que viene en el mapa pasado como JSON desde el Back-end
        Swal.fire('Error al eliminar cliente', e.error.mensaje, 'error'); //en alerta
        console.error(e.error.mensaje);

        return throwError(e);
      }));
  }
}

