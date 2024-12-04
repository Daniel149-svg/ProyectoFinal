import { Component, Input, OnInit } from '@angular/core';
import { SolicitudRepuesto, SolicitudRepuestosService } from '../solicitud.repuestos.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-repuestos-padre',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './solicitud-repuestos-padre.component.html',
  styleUrl: './solicitud-repuestos-padre.component.css'
})
export class SolicitudRepuestosPadreComponent implements OnInit {

  @Input() solicitudLista!: any; // Define el tipo adecuado.
  @Input() indice!: number;      // Define como número si es un índice.

  solicitudes: SolicitudRepuesto[] = [];

  constructor(private solicitudService: SolicitudRepuestosService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.solicitudService.obtenerSolicitudes().subscribe(
      data => {
        this.solicitudes = data || [];
        console.log('Solicitudes cargadas:', this.solicitudes);
      },
      error => console.error('Error al cargar las solicitudes:', error)
    );
  }

  marcarComoRealizada(id: string, indice: number): void {
    this.solicitudService.marcarSolicitudComoRealizada(id).subscribe(
      () => {
        // Actualiza el estado
        this.solicitudes[indice].estado = 'realizada';
  
        Swal.fire({
          icon: 'success',
          title: '¡Solicitud realizada!',
          text: 'La solicitud ha sido marcada como realizada.',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Error al marcar la solicitud como realizada:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar la solicitud.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}