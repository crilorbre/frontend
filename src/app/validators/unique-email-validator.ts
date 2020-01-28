import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function uniqueEmailValidator(userService: UserService) {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const email = control.value;
        return userService.getUserByEmail(email).pipe(
            map(users => {
                return users && users.length > 0 ? { 'uniqueEmail': true } : null
            })
        );
    }
}