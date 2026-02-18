import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/button/button.component';

@Component({
  selector: 'app-button-examples',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './button-examples.component.html'
})
export class ButtonExamplesComponent {} 
