import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

passwordsMustMatch(p1:string,p2:string)
{
   return (formGroup: FormGroup) => {

    const password1Control = formGroup.controls[p1];
    const password2Control = formGroup.controls[p2];

    if(password1Control.value === password2Control.value){
      password2Control.setErrors(null);
    }else{
      password2Control.setErrors({noMatch: true});

    }

   }
}

}
