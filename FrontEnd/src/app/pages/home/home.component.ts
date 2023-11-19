import { Component, OnInit } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FoodService } from 'src/app/service/food.service';
import { Food } from 'src/app/shared/model/Food';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  foods:Food[]=[];
  constructor(private foodService:FoodService, private activatedRoute:ActivatedRoute) {
//1
    let foodsObservable:Observable<Food[]>
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm)
      foodsObservable= this.foodService.getAllFoodBySearchTerm(params.searchTerm)
    //2
      else if(params.tag)
      foodsObservable = this.foodService.getAllFoodByTag(params.tag)
      else
      foodsObservable= foodService.getAll();
    foodsObservable.subscribe((serverFoods)=>{
      this.foods = serverFoods;
    })
    })

  }


  ngOnInit(): void {
 
  }

}
