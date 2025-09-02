import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class NavItemComponent {
  @Input() label!: string
  @Input() icon!: string
  @Input() active: boolean = false
  @Input() itemKey!: string
  @Output() hovered = new EventEmitter<string | null>()

  getTextColor(): string {
    switch (this.itemKey) {
      case 'inicio':
        return this.active ? 'text-green-500' : 'hover:text-green-500'
      case 'perfil':
        return this.active ? 'text-green-400' : 'hover:text-green-400'
      case 'configuracion':
        return this.active ? 'text-green-600' : 'hover:text-green-600'
      case 'salir':
        return this.active ? 'text-gray-300' : 'hover:text-gray-300'
      default:
        return 'text-green-200'
    }
  }
}
