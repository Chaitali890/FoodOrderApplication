import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { FoodService } from 'src/app/service/food.service';
import { Food } from 'src/app/shared/model/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!:Food;
  constructor(activatedRoute:ActivatedRoute, private foodService:FoodService, private cartService:CartService,private router:Router) {
    activatedRoute.params.subscribe((params)=>{
      if(params.id)
      foodService.getFoodById(params.id).subscribe(serverFood=>{
        this.food = serverFood;
      })
    })
  }

  ngOnInit(): void {

  }

  //Add to cart button
  addToCart(){
      this.cartService.addToCart(this.food);
      this.router.navigateByUrl('/cart-page')
  }

}
