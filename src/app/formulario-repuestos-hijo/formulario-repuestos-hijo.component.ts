import { Component, OnInit } from '@angular/core';
import { SolicitudRepuesto, SolicitudRepuestosService } from '../solicitud.repuestos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudRepuestosPadreComponent } from '../solicitud-repuestos-padre/solicitud-repuestos-padre.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-repuestos-hijo',
  standalone: true,
  imports: [CommonModule, FormsModule, SolicitudRepuestosPadreComponent],
  providers: [SolicitudRepuestosService],
  templateUrl: './formulario-repuestos-hijo.component.html',
  styleUrl: './formulario-repuestos-hijo.component.css',
})
export class FormularioRepuestosHijoComponent implements OnInit {
  titulo = 'Solicitud de repuesto';
  solicitudes: SolicitudRepuesto[] = [];

  // Variables del formulario
  cuadroCodigo = '';
  cuadroDescripcion = '';
  cuadroCantidad = 0;
  cuadroUgencia = '';

  constructor(private solicitudService: SolicitudRepuestosService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.solicitudService.obtenerSolicitudes().subscribe(
      (data) => {
        this.solicitudes = data || [];
        console.log('Solicitudes cargadas:', this.solicitudes);
      },
      (error) => console.error('Error al cargar las solicitudes:', error)
    );
  }

  guardar_solicitud() {
    const nuevaSolicitud: SolicitudRepuesto = {
      codigo: this.cuadroCodigo,
      descripcion: this.cuadroDescripcion,
      cantidad: this.cuadroCantidad,
      urgencia: this.cuadroUgencia,
      estado: 'pendiente'
    };
  
    this.solicitudService.agregarSolicitud(nuevaSolicitud).subscribe(
      (response) => {
        console.log('Solicitud guardada:', response);
  
        Swal.fire({
          icon: 'success',
          title: '¡Solicitud registrada!',
          text: 'La solicitud ha sido guardada exitosamente.',
          timer: 2000,
          showConfirmButton: false
        });
  
        this.cargarSolicitudes(); // Recargar las solicitudes después de guardar
        this.limpiarFormulario(); // Limpiar el formulario
      },
      (error) => {
        console.error('Error al guardar la solicitud:', error);
  
        // Mostrar notificación de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar la solicitud. Por favor, intenta de nuevo.',
          showConfirmButton: true
        });
      }
    );
  }
  
  limpiarFormulario() {
    this.cuadroCodigo = '';
    this.cuadroDescripcion = '';
    this.cuadroCantidad = 0;
    this.cuadroUgencia = '';
  }
}
