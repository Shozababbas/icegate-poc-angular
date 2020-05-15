import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  optionSelected: boolean = false;

  constructor(private router: Router) { }
  
    selected() {
      this.optionSelected = true;
      this.router.navigate(['/register']);
    }
}
