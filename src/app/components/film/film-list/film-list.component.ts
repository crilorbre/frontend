import { Component, OnInit } from '@angular/core';
import { FilmsService } from "../../../services/films.service";
import { MatDialogService } from "../../../services/mat-dialog.service";
import { UserService } from "../../../services/users.service";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: any = [];

  constructor(private filmService: FilmsService, private dialogService: MatDialogService,
    private userService: UserService ) { }

  ngOnInit() {
    this.getFilms()
  }

  getFilms(){
    this.filmService.getFilms().subscribe(
      res => this.films = res,
      err => console.log(err)
    )
  }

  deleteFilm(id){
    this.dialogService.openConfirmDialog('Are you sure to delete this film?').afterClosed()
    .subscribe(
      res => {
        if(res){
          this.filmService.deleteFilm(id).subscribe(
            res => {console.log(res),
              this.ngOnInit()},
            err => console.log(err)
          )
        }
      }
    )
  }

}
