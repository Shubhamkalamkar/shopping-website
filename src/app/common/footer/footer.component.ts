import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [RouterModule, MatIconModule, FormsModule]
})
export class FooterComponent {
  email: string = '';

  onSubmit() {
    // Handle newsletter signup logic here
    console.log('Newsletter signup:', this.email);
    this.email = '';
  }
}