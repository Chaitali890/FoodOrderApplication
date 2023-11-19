import { Injectable } from '@angular/core';
import { sample_food, sample_tags } from 'src/data';
import { Food } from '../shared/model/Food';
import { Tag } from '../shared/model/tag';
import { HttpClient } from '@angular/common/http';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient:HttpClient) { }
//1.
  getAll():Observable<Food[]>{
    return this.httpClient.get<Food[]>(FOODS_URL)
  }

  //2.search food
  getAllFoodBySearchTerm(searchTerm:string){
    return this.httpClient.get<Food[]>(FOODS_BY_SEARCH_URL +searchTerm)
  }

  //3.Get All Tags
  getAllTags():Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(FOODS_TAGS_URL);
  }

  //4.Get Food by Tags
  getAllFoodByTag(tag:string):Observable<Food[]>{
    return tag === "All"?this.getAll():this.httpClient.get<Food[]>(FOODS_BY_TAG_URL +tag)

  }

  //5.Get food by Id
  getFoodById(foodId:string):Observable<Food>{
    return this.httpClient.get<Food>(FOODS_BY_ID_URL +foodId)
  }

}
