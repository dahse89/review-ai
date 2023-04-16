import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end'
  focused = false

  onAiInputFocus(event: any) {
    this.focused = true
  }

  onAiInputBlur(event: any) {
      this.focused = false
    }
}
