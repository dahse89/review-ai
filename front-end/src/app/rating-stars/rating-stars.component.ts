import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent {
  @Input() name = ''
  @Input() label = ''

  @Output() radioClick: EventEmitter<any> = new EventEmitter()

  onRadioChange(event: any): void {
    const value = parseInt(event.target.value);
    const name = event.target.getAttribute('data-label')

    this.radioClick.emit({name, value})
  }
}
