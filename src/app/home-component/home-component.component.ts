import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioVehiculoService } from '../servicio-vehiculo.service'; 
import { vehiculosService } from '../vehiculos.service'; 
import Swal from 'sweetalert2';

import { vehiculo } from '../vehiculo.models';
import { VehiculoHijoComponent } from "../vehiculo-hijo/vehiculo-hijo.component";

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, FormsModule, VehiculoHijoComponent],
  providers: [ServicioVehiculoService],
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  titulo = 'Registro de Vehiculos';
  
  vehiculos!: vehiculo[];

  cuadroMarca: string = "";
  cuadroModelo: string = "";
  cuadroNmotor: string = "";
  cuadroColor: string = "";
  cuadroTrasmicion: string = "";
  cuadroAnio: number = 0;
  cuadroValor: number = 0;
  
  constructor(private miServicio: ServicioVehiculoService, private vehiculosService: vehiculosService) { }

  ngOnInit(): void {
    this.vehiculosService.obtener_vehiculo().subscribe(
        misVehiculos => {
            if (misVehiculos) {
                console.log(misVehiculos);
                this.vehiculos = Object.values(misVehiculos);
                this.vehiculosService.set_vehiculo(this.vehiculos);
            } else {
                console.warn('No se obtuvieron vehículos');
                this.vehiculos = [];
            }
        },
        error => {
            console.error('Error al obtener vehículos:', error);
        }
    );
  }

  guardar_vehiculo() {
    // Validación de campos vacíos
    if (
      this.cuadroMarca === "" || 
      this.cuadroModelo === "" || 
      this.cuadroNmotor === "" || 
      this.cuadroColor === "" || 
      this.cuadroTrasmicion === "" || 
      this.cuadroAnio === 0 || 
      this.cuadroValor === 0
    ) {
      // Mostrar alerta de datos incompletos
      Swal.fire({
        icon: 'error',
        title: 'Datos incompletos',
        text: 'Por favor complete todos los campos antes de guardar.',
        confirmButtonText: 'Cerrar'
      });
      return;  // No guardar si los datos están incompletos
    }

    // Crear el objeto vehículo
    let miVehiculo = new vehiculo(
      this.cuadroMarca,
      this.cuadroModelo,
      this.cuadroNmotor,
      this.cuadroColor,
      this.cuadroTrasmicion,
      this.cuadroAnio,
      this.cuadroValor
    );

    // Llamar al servicio para agregar el vehículo
    this.vehiculosService.agregar_vehiculo_servicio(miVehiculo);

    // Limpiar los campos después de guardar
    this.cuadroMarca = "";
    this.cuadroModelo = "";
    this.cuadroNmotor = "";
    this.cuadroColor = "";
    this.cuadroTrasmicion = "";
    this.cuadroAnio = 0;
    this.cuadroValor = 0;

    // Mostrar alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Vehículo registrado',
      text: 'El vehículo ha sido registrado correctamente.',
      confirmButtonText: 'Aceptar'
    });
  }
}
