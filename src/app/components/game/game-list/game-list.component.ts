import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../../services/games.service';
import { MatDialogService } from "../../../services/mat-dialog.service";
import { UserService } from "../../../services/users.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: any=[]

  constructor(private gameService: GamesService, private matDialogService: MatDialogService,
    private userService: UserService) { }

  ngOnInit() {
    this.getGames()
  }

  getGames(){
    this.gameService.getGames().subscribe(
      res => {this.games = res,
        console.log(res)},
      err => console.error(err)
    );
  }

  deleteGame(id: String){
    this.matDialogService.openConfirmDialog('Are you sure to delete this game?').afterClosed()
    .subscribe(res => {
      if(res){
        this.gameService.deleteGame(id).subscribe(
          res=>{
            console.log(res);
            this.getGames();
          },
          err => console.log(err)
        )
      }
    });
  }

  Search(word){
    if(word.value.length > 0){
      this.gameService.searchGame(word.value).subscribe(
        res=> this.games = res,
        err => console.error(err))
    }else
        this.games = this.getGames();
  }


}
