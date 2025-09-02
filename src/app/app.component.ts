import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
})

export class AppComponent {
  private router = inject(Router);

  constructor() {
    // Enable view transitions if supported
    if (this.supportsViewTransitions()) {
      this.router.events.subscribe(() => {
        if (!this.router.navigated) return;
        
        // Start view transition
        if (!(document as any).startViewTransition) return;
        
        (document as any).startViewTransition(() => {
          // This will be called when the DOM is ready to be captured
          return new Promise(resolve => {
            // Small delay to ensure the transition is visible
            setTimeout(resolve, 10);
          });
        });
      });
    }
  }

  private supportsViewTransitions(): boolean {
    return 'startViewTransition' in document;
  }
}
