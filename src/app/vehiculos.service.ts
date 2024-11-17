import { Injectable } from '@angular/core';
import { ServicioVehiculoService } from './servicio-vehiculo.service';
import { vehiculo } from './vehiculo.models';
import { DataServices } from './data.service';


@Injectable({
  providedIn: 'root'
})

export class vehiculosService{
  
        vehiculos: vehiculo[]=[];

        constructor(private servicioMensaje: ServicioVehiculoService, private dataService: DataServices){}


        agregar_vehiculo_servicio(vehiculo:vehiculo){
          this.servicioMensaje.muestra_mensaje("Nombre ingresado: " + vehiculo.marca);
          this.vehiculos.push(vehiculo);
          this.dataService.guardar_arreglo(this.vehiculos);
      }
        

        encontar_vehiculo(indice: number){
          let vehiculo: vehiculo = this.vehiculos[indice];
          return vehiculo;
        }

        actualizar_vehiculo(indice: number, vehiculo:vehiculo){
          let vehiculoModificar = this.vehiculos[indice];
          vehiculoModificar.marca = vehiculo.marca;
          vehiculoModificar.modelo = vehiculo.modelo;
          vehiculoModificar.Nmotor = vehiculo.Nmotor;
          vehiculoModificar.color = vehiculo.color;
          vehiculoModificar.trasmicion = vehiculo.trasmicion;
          vehiculoModificar.anio = vehiculo.anio;
          vehiculoModificar.valor = vehiculo.valor;

          this.dataService.actualizar_posicion(indice, vehiculo);
        }


        eliminarVehiculo(indice: number){
          this.vehiculos.splice(indice, 1);
          this.dataService.eliminar_posicion(indice);
          this.dataService.guardar_arreglo(this.vehiculos);
  
      }
        obtener_vehiculo(){
          return this.dataService.cargar_arreglo();//observable -> permite operaciones asincronas en 2do plano, actualizar sin hacer select
      }

        set_vehiculo(misVehiculos: vehiculo[]){
          this.vehiculos = misVehiculos;
      }
       
}