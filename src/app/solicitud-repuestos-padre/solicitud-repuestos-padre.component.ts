import { Component, Input, OnInit } from '@angular/core';
import { SolicitudRepuesto, SolicitudRepuestosService } from '../solicitud.repuestos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitud-repuestos-padre',
  standalone: true,
  imports: [RouterModule],
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

  
}