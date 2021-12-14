import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/_services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private validators: ValidatorsService) { 
   
    this.buildForm();
    this.loadData();
    this.createListeners();

  }
  createListeners() {

    this.form.valueChanges.subscribe( form => console.log(form));
    this.form.statusChanges.subscribe(form => console.log(form));
  }

  get invalidUser(){
    return this.form.get('user').invalid && this.form.get('user').touched

  }
  get pass2NoValid(){

    let p1 = this.form.get('password1').value;
    let p2 = this.form.get('password2').value;

    return !(p1 === p2); 
  }
  get pass1NoValid(){
    return this.form.get('password1').invalid && this.form.get('password1').touched
  }
  get hobbiesArray(){
    return this.form.get('hoobies') as FormArray
  }
  get invalidName(){
    return this.form.get('name').invalid && this.form.get('name').touched
  }
  get invalidSurname(){
    return this.form.get('surname').invalid && this.form.get('surname').touched
  }
  get invalidEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched
  }

  get invalidAddreesDistrit(){
    return this.form.get('addrees.distrit').invalid && this.form.get('addrees.distrit').touched
  }

  get invalidAddreesPostCode(){
    return this.form.get('addrees.postcode').invalid && this.form.get('addrees.postcode').touched
  }
  ngOnInit(): void {
  }

  buildForm(){
      this.form = this.fb.group({

        //default value, syunc validators, async validators
        name : ['', [Validators.required, Validators.minLength(5)]],
        surname : ['',[Validators.required,Validators.minLength(5), this.validators.noJurao]],
        email : ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
        user: ['ijurao',Validators.required,this.validators.userAlreadyExist],
        password1: ['',Validators.required],
        password2: ['',Validators.required],
        
        addrees: this.fb.group({
          distrit: ['',Validators.required],
          postcode: ['',Validators.required]
        }),
        hoobies : this.fb.array([])
      }, {
         validators : [this.validators.passwordsMustMatch('password1','password2')
                      ]

      });
  }
  addHoobie(){
    this.hobbiesArray.push(this.fb.control('New',[Validators.required]));
  }
  deleteHoobie(index){
    this.hobbiesArray.removeAt(index);

  }
  loadData(){
    this.form.reset({
      name: "jurao ignacio",
      surname: "moreda",
      email: "ijurao@gmail.com",
      addrees: {
        distrit: "la plata",
        postcode: "1900"
      }

    })
  }

  save(){
    if(this.form.invalid){
      Object.values(this.form.controls).forEach(x => {

        if(x instanceof FormGroup)
        {
          Object.values(x.controls).forEach(s => { s.markAsTouched() } );
        }
        else{
          x.markAsTouched();
        }
       
      });
      return;
   }
    console.log(this.form.value);
  }

}
