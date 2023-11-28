import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController} from '@ionic/angular';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl:NavController) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    });
  }

  async ngOnInit() {
  }
  
  validatePassword(password: string): boolean {
    // Expresión regular para al menos 8 caracteres, un número y un carácter especial
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    // const passwordPattern = /^.{8,}$/;
    
    // Comprobar si la contraseña cumple con las condiciones
    if (passwordPattern.test(password)) {
        return true;
    } else {
        return false;
    }
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    else if(this.formularioRegistro.valid && f.password != f.confirmacionPassword){
      const alert = await this.alertController.create({
        header: 'Contraseña Incorrecta',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    else if(this.formularioRegistro.valid && f.password == f.confirmacionPassword && this.validatePassword(f.password)==false){
      const alert = await this.alertController.create({
        header: 'Contraseña Invalida',
        message: 'La contraseña debe contener almenos 8 caracteres, un numero y almenos un caracter especial',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    else if((this.formularioRegistro.valid && f.password==f.confirmacionPassword && this.validatePassword(f.password)== true)){
      var datos = JSON.parse(localStorage.getItem('usuario')!);

      if (usuario.nombre == datos.nombre){
        const alert = await this.alertController.create({
          header: 'El Usuario ya existente',
          message: 'El nombre de Usuario '+usuario.nombre+' ya se encuentra ocupado ',
          buttons: ['Aceptar']
        });
    
        await alert.present();

        return;

      }else{
        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          buttons: ['Aceptar']
        });
    
        await alert.present();
        return localStorage.setItem('usuario', JSON.stringify(usuario));
      }
  
      }

    }
  }



