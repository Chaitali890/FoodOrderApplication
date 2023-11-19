import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  cartQuantity=0;
  user!:User
  constructor(private cartService:CartService, private userService:UserService) {
    cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity=newCart.totalQuantity;
    })
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    })
  }



  ngOnInit(): void {

  }
  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }

}
