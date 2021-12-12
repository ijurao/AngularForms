import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

constructor() { }

noJurao(control:FormControl):{[s:string]: boolean} {
 
  if(control.value?.toLowerCase() === 'jurao'){
    return  {
        noJurao: true
    }
  }
  return null;

}

}
