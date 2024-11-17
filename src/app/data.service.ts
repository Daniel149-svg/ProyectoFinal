import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { vehiculo } from "./vehiculo.models";

@Injectable({
    providedIn: 'root'
})
export class DataServices{
    constructor(private httpClient: HttpClient){}

    guardar_arreglo(vehiculo: vehiculo[]){
        this.httpClient.put('https://daniel-trujillo-proyectofinal-default-rtdb.firebaseio.com//final.json', vehiculo).subscribe(
            response => console.log("Se han guardado los cambios en firebase"),
            error=>console.log('Error: ' + error)
        );
    }

    cargar_arreglo(){
        return this.httpClient.get('https://daniel-trujillo-proyectofinal-default-rtdb.firebaseio.com//final.json');
    }

    actualizar_posicion(indice: number, vehiculo: vehiculo){
        let url = "https://daniel-trujillo-proyectofinal-default-rtdb.firebaseio.com//final/" + indice + ".json";

        this.httpClient.put(url, vehiculo).subscribe(
            response =>console.log("Se ha actualizado el vehiculo " + response),
            error =>console.log("Error: "+ error)
        );
    }

    eliminar_posicion(indice: number){
        let url = "https://daniel-trujillo-proyectofinal-default-rtdb.firebaseio.com//final/" + indice + ".json";

        this.httpClient.delete(url).subscribe(
            response => console.log("Se ha eliminado el vehiculo " + response),
            error => console.log("Error: " + error)
        );
    }
}