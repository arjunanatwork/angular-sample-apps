import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { BoardItemService } from "../services/board-item.service"


@Component({
  selector: "board-item",
  providers: [ BoardItemService] ,
  templateUrl: "./board-item.component.html",
  styleUrls: ["./board-item.component.css"]
})
export class BoardItemComponent implements OnInit { 

  constructor(private route: ActivatedRoute, private boardItemService: BoardItemService) { }

  getBoard(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    //this.boardItemService.getBoardInfo(id)
  }

  ngOnInit(): void {
    this.getBoard();
  }
}
