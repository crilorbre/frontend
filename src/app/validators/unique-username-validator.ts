import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function uniqueUsernameValidator(userService: UserService) {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const username = control.value;
        return userService.getUserByUsername(username).pipe(
            map(users => {
                return users && users.length > 0 ? { 'uniqueUsername': true } : null
            })
        );
    }
}