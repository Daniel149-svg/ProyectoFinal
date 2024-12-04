import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


// Modelo para una solicitud de repuestos
export interface SolicitudRepuesto {
  estado: string;
  id?: string; // Para el ID generado automáticamente
  codigo: string;
  descripcion: string;
  cantidad: number;
  urgencia: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudRepuestosService {
  private url = 'https://daniel-trujillo-proyectofinal-default-rtdb.firebaseio.com/solicitudes'; // Cambiado por la ruta correcta

  constructor(private httpClient: HttpClient) {}

  // Método para obtener todas las solicitudes
  obtenerSolicitudes(): Observable<SolicitudRepuesto[]> {
    return this.httpClient.get<{ [key: string]: SolicitudRepuesto }>(this.url + '.json').pipe(
      map(res => {
        const solicitudesArray: SolicitudRepuesto[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            solicitudesArray.push({ ...res[key], id: key }); // Agregar la clave como 'id'
          }
        }
        return solicitudesArray;
      })
    );
  }

  // Método para agregar una nueva solicitud
  agregarSolicitud(solicitud: SolicitudRepuesto): Observable<SolicitudRepuesto> {
    return this.httpClient.post<SolicitudRepuesto>(this.url + '.json', solicitud);
  }

  // Método para actualizar una solicitud existente (requiere ID o índice)
  actualizarSolicitud(id: string, solicitud: SolicitudRepuesto): Observable<SolicitudRepuesto> {
    const urlActualizada = `${this.url}/${id}.json`;
    return this.httpClient.put<SolicitudRepuesto>(urlActualizada, solicitud);
  }  

    // Método para marcar como realizada una solicitud
  marcarSolicitudComoRealizada(id: string): Observable<any> {
    const urlActualizada = `${this.url}/${id}.json`;
    return this.httpClient.patch(urlActualizada, { estado: 'realizada' });
  }
  
}
