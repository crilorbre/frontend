import { Component, OnInit } from '@angular/core';
import { FilmsService } from "../../../services/films.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Film } from 'src/app/models/Film';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {

  film: Film = {}

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")
    ]),
    created_at: new FormControl(new Date(), Validators.required),
    genre: new FormControl('', Validators.required),
  })

  edit: boolean = false;

  constructor(private filmService: FilmsService, private router: Router, 
    private activatedRoute: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.filmService.getFilm(params.id).subscribe(
        res =>{
          this.film = res;
          this.form.controls['title'].setValue(this.film.title);
          this.form.controls['description'].setValue(this.film.description);
          this.form.controls['image'].setValue(this.film.image);
          this.form.controls['created_at'].setValue(this.film.release_date);
          this.form.controls['genre'].setValue(this.film.genre);
          this.edit = true;
        },
        err => console.log(err)
      )
    }
  }

  saveNewFilm(){
    this.filmService.saveFilm(this.film).subscribe(
      res => {
      console.log(res);
      this.router.navigate(['/films']);
      this.toastrService.success('Film saved successful')
    },
      err => console.error(err)
    )
  }

  updateFilm(){
    this.filmService.updateFilm(this.film._id.toString(), this.film).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/films']);
        this.toastrService.success('Film updated successful')
      },
      err => console.error(err)
    );
  }


  onSubmit(){
    this.film.title = this.form.get('title').value;
    this.film.description =  this.form.get('description').value;
    this.film.image = this.form.get('image').value;
    this.film.release_date = this.form.get('created_at').value;
    this.film.genre = this.form.get('genre').value;

    if(this.edit == true){
      this.updateFilm();
    }else
      this.saveNewFilm();
  }

  goToHome(){
    this.router.navigate(['/films'])
  }

}
