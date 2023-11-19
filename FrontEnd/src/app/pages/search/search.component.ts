import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm='';
//1
  constructor(private activatedRouter:ActivatedRoute, private router:Router) {
    activatedRouter.params.subscribe((params)=>{
      if(params.searchTerm)
        this.searchTerm = params.searchTerm;
    })
  }
  ngOnInit(): void {

  }
//2
  search(term:string){
    if(term)
    this.router.navigateByUrl('/search/'+term);
  }
}
