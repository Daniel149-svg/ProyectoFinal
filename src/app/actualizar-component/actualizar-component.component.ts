import { Component, OnInit } from '@angular/core';
import { vehiculo } from '../vehiculo.models';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { vehiculosService } from '../vehiculos.service';



@Component({
  selector: 'app-actualizar-component',
  standalone: true,
  imports: [FormsModule],
  providers: [],
  templateUrl: './actualizar-component.component.html',
  styleUrl: './actualizar-component.component.css'
})

export class ActualizarComponentComponent implements OnInit {
  indice: any;

  volverHome(){
    this.router.navigate(['']);
  

  }
  titulo = 'Actualizar Vehiculo';

  vehiculos!: vehiculo[];

  cuadroMarca: string = "";
  cuadroModelo: string = "";
  cuadroNmotor: string = "";
  cuadroColor: string = "";
  cuadroTrasmicion: string = "";
  cuadroAnio: number = 0;
  cuadroValor: number = 0;

  constructor(private router: Router, private vehiculosService:
    vehiculosService, private route: ActivatedRoute){    

  }
  ngOnInit(): void {
    this.indice = this.route.snapshot.params['id'];
    let vehiculo: vehiculo = this.vehiculosService.encontar_vehiculo
    (this.indice);
    this.cuadroMarca = vehiculo.marca;
    this.cuadroModelo = vehiculo.modelo;
    this.cuadroNmotor= vehiculo.Nmotor;
    this.cuadroColor= vehiculo.color;
    this.cuadroTrasmicion= vehiculo.trasmicion;
    this.cuadroAnio = vehiculo.anio;
    this.cuadroValor = vehiculo.valor;


  }

  actualizar_vehiculo(){
    //if
    let miVehiculo = new vehiculo(this.cuadroMarca, this.cuadroModelo, this.cuadroNmotor, this.cuadroColor, this.cuadroTrasmicion, this.cuadroAnio, this.cuadroValor);

   this.vehiculosService.actualizar_vehiculo(this.indice, miVehiculo);

   this.router.navigate(['']);
  

   this.cuadroMarca = "";
   this.cuadroModelo = "";
   this.cuadroNmotor = "";
   this.cuadroColor = "";
   this.cuadroTrasmicion = "";
   this.cuadroAnio = 0;
   this.cuadroValor = 0;
  }
  
 }