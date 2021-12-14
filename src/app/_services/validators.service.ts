import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

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

userAlreadyExist(control:FormControl) : Promise<{[s:string]: boolean}> | Observable<{[s:string]: boolean}>
{

  return new Promise( (resolve,reject) => {
     //simulating http requst    
    setTimeout(() => {
        if(control.value === 'ijurao')
        {
          resolve({exist:true});
        }else{
          resolve(null)
        }

    },3000);
  }
  )}

}
