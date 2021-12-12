import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

 apiCountries : string =  "https://restcountries.com/v3.1/all";
 constructor(private http: HttpClient) { }

 getAllCountries(){
  return this.http.get(this.apiCountries)
   .pipe( 
     map( (resp:any[]) => 
         resp.map( pais => ({ nombre: pais.name.common, codigo: pais.name.common})
       )
     )
    );

}


}
