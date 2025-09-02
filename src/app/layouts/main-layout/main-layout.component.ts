import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@shared/navbar/navbar.component';

interface Bubble {
  size: string;
  opacity: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  // Simple bubbles data for background
  bubbles: Bubble[] = [];
  
  ngOnInit() {
    this.initializeBubbles();
  }
  
  private initializeBubbles() {
    this.bubbles = Array(15).fill(0).map((_, i) => ({
      size: Math.random() > 0.5 ? 'w-7 h-7' : 'w-8 h-8',
      opacity: Math.random() > 0.5 ? 'opacity-25' : 'opacity-15',
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 2
    }));
  }
}
