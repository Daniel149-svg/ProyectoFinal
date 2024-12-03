import { Component, OnInit } from '@angular/core';
import { SolicitudRepuesto, SolicitudRepuestosService } from '../solicitud.repuestos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudRepuestosPadreComponent } from '../solicitud-repuestos-padre/solicitud-repuestos-padre.component';

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
    };

    this.solicitudService.agregarSolicitud(nuevaSolicitud).subscribe(
      (response) => {
        console.log('Solicitud guardada:', response);
        alert('¡Solicitud registrada con éxito!');
        this.cargarSolicitudes(); // Recargar las solicitudes después de guardar
        this.limpiarFormulario();
      },
      (error) => {
        console.error('Error al guardar la solicitud:', error);
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
