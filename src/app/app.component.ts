import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myFlixAngular';

  constructor(public dialog: MatDialog) { }

openUserRegistrationDialog(): void { // Function to open the dialog when the signup button is clicked
    this.dialog.open(UserRegistrationFormComponent, {
    width: '280px' // Assigning the dialog a width
    });
  }

openUserLoginDialog(): void { // Function to open the dialog when the login button is clicked
    this.dialog.open(UserLoginFormComponent, {
    width: '280px' // Assigning the dialog a width
    });
  }
}
