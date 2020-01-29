import { Component, OnInit } from '@angular/core';
import { GamesService } from "../../../services/games.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Game } from 'src/app/models/Game';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  game: Game = {}

  form = new FormGroup({
    title: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(50)
    ])),
    description: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(200)
    ])),
    image: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")
    ]))
  })

  edit: boolean = false;

  date = new Date();

  constructor(private gameService: GamesService, private router: Router, 
    private activatedRoute: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.gameService.getGame(params.id).subscribe(
        res =>{
          this.game = res;
          this.form.controls['title'].setValue(this.game.title);
          this.form.controls['description'].setValue(this.game.description);
          this.form.controls['image'].setValue(this.game.image);
          this.edit = true;
        },
        err => console.log(err)
      )
    }
  }

  saveNewGame(){
    this.gameService.createGame(this.game).subscribe(
      res =>{
        console.log(res)
        this.router.navigate(['/games'])
        this.toastrService.success('Game saved successful')
      },
      err => console.log(err)
    );
  }

  updateGame(){
    this.gameService.updateGame(this.game._id.toString(), this.game).subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/games']);
        this.toastrService.success('Game updated successful')

      },
      err => console.log(err)
    );
  }
  

  onSubmit(){
    this.game.title = this.form.get('title').value;
    this.game.description = this.form.get('description').value;
    this.game.image = this.form.get('image').value;

    if(this.edit == true){
      this.updateGame();
    }else
      this.saveNewGame();
  }

  goToHome(){
    this.router.navigate(['/games'])
  }

}
