import { Component, Input, OnInit } from '@angular/core';
import { SolicitudRepuestosService } from '../solicitud.repuestos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-solicitud',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-solicitud.component.html',
  styleUrl: './eliminar-solicitud.component.css'
})
export class EliminarSolicitudComponent implements OnInit {

  @Input() solicitudId: string = '';  // ID de la solicitud a eliminar

  constructor(
    private solicitudService: SolicitudRepuestosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener el ID de la solicitud desde la ruta
    this.route.params.subscribe(params => {
      this.solicitudId = params['id'];
      console.log('Solicitud ID a eliminar:', this.solicitudId);
    });
  }

  eliminarSolicitud(): void {
    if (this.solicitudId) {
      this.solicitudService.eliminarSolicitud(this.solicitudId).subscribe(
        () => {
          alert('¡Solicitud eliminada con éxito!');
          this.router.navigate(['/solicitudes']);  // Redirigir a la lista de solicitudes
        },
        (error) => {
          console.error('Error al eliminar la solicitud:', error);
          alert('Error al eliminar la solicitud.');
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/solicitudes']);  // Volver al listado sin eliminar
  }
}
