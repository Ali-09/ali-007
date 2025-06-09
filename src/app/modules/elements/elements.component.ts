import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastExamplesComponent } from './components/toast-examples/toast-examples.component';

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [CommonModule, ToastExamplesComponent],
  templateUrl: './elements.component.html',
})
export class ElementsComponent {
  constructor() {}
}
