import { Component, Input, OnInit } from '@angular/core';
import { Movie, Search } from '../../interfaces/movie';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  movie!: Search;
  constructor() { }

  ngOnInit() {
  }

}
