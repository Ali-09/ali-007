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
        return this.active ? 'text-green-400' : 'hover:text-green-400'
      case 'perfil':
        return this.active ? 'text-blue-400' : 'hover:text-blue-400'
      case 'configuracion':
        return this.active ? 'text-purple-400' : 'hover:text-purple-400'
      case 'salir':
        return this.active ? 'text-red-400' : 'hover:text-red-400'
      default:
        return 'text-blue-200'
    }
  }
}
