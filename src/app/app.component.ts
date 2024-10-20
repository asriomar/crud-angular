import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDataComponent } from "./user-data/user-data.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud-app';
}
