import { TestBed, async, inject } from '@angular/core/testing';

import { FilmGuard } from './film.guard';

describe('FilmGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilmGuard]
    });
  });

  it('should ...', inject([FilmGuard], (guard: FilmGuard) => {
    expect(guard).toBeTruthy();
  }));
});
