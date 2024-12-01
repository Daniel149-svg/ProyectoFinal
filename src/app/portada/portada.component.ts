import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { vehiculo } from '../vehiculo.models';
import { vehiculosService } from '../vehiculos.service';

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [],
  providers: [Router],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {

  volverHome(){
    this.router.navigate(['']);


  }

  constructor(private router: Router,){    

  }

}
