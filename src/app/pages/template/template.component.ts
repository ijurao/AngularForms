import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/_services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit,OnDestroy {

  user = {
    nombre: '',
    surname: '',
    email:'',
    countrie:'Argentina',
    gender: 'M'
  }
  countries : any[] = []
  constructor(private countriesService: CountriesService) { }
  ngOnDestroy(): void {
    ;
  }

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe(data =>{
       this.countries = data;
       this.countries.unshift({nombre: '-Select countrie-', codigo: ''})
       console.log(this.countries);
    });
  }

  save(form:NgForm){
    if(form.invalid){
       Object.values(form.controls).forEach(x => {
        x.markAsTouched();
       });
       return;
    }
    console.log(form.value);
  }

}
