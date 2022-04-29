import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }
  errorLogin=false;
  active = 1;
  usuario="";
  pass="";
  ngOnInit(): void {
  }
  login(){
    let user={
      user:this.usuario,
      pass:this.pass
    }
    this._authService.auth(user).subscribe((result) => {
      if(result!=null){
          this._router.navigate(['/admin/tablero']);
      }else{
        this.errorLogin=true;
        setTimeout(() => {
          this.errorLogin=false;
        }, 5000);
      }
    })
  }
}
