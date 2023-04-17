import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ai-input',
  templateUrl: './ai-input.component.html',
  styleUrls: ['./ai-input.component.scss']
})
export class AiInputComponent {
  @Input() aiInput: string = ''
  @Input() loading: boolean = false
  focused: boolean = false

  @Output() focus: EventEmitter<any> = new EventEmitter()
  @Output() blur: EventEmitter<any> = new EventEmitter()
  @Output() go: EventEmitter<any> = new EventEmitter()

  onFocusInput(event: any) {
    this.focused = true
    this.focus.emit(null)
  }

  onBlurInput(event: any) {
     this.focused = false
      this.blur.emit(null)
  }

  onGoClicked(event: any) {
    this.go.emit(this.aiInput)
  }
}
