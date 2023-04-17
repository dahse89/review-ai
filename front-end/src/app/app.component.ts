import { Component, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { RatingDimension } from './dto'

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'front-end'
  focused: boolean = false
  loading: boolean = false
  topic: string = ''
  ratingDimensions: Array<RatingDimension> =
    [
      // {
      //   "name": "Cleanliness",
      //   "description": "The cleanliness of the restaurant, including the bathrooms"
      // },
      // {
      //   "name": "Food Quality",
      //   "description": "The quality of the food served at the restaurant"
      // },
      // {
      //   "name": "Value for Money",
      //   "description": "The cost of the food and drinks compared to the quality of the experience"
      // },
      // {
      //   "name": "Service Quality",
      //   "description": "The quality of the service provided by the restaurant staff"
      // },
      // {
      //   "name": "Atmosphere",
      //   "description": "The atmosphere of the restaurant, including decor, lighting, and music"
      // }
    ]

  resultRatingText: string = ''

  constructor(private http: HttpClient) {

  }

  onAiInputFocus(event: any) {
    this.focused = true
  }

  onAiInputBlur(event: any) {
    this.focused = false
  }

  onAiInputGo(topic: string) {
    this.loading = true
    this.topic = topic

    this.getRatingDimensions(topic)
      .subscribe((data: Array<RatingDimension>) => {
        this.ratingDimensions = data
        this.loading = false
      });
  }


  private handleRatingDimensionsCallError(error: HttpErrorResponse) {
    this.loading = false
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private getRatingDimensions(topic: string): Observable<Array<RatingDimension>> {
    let params = new HttpParams()
      .set('topic', topic) // Add query parameter 1
      .set('lang', 'en') // Add query parameter 2

    const options: object = { params, headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' } };
    const url: string = 'http://localhost:8080/rating-dimensions';

    return this.http.get<Array<RatingDimension>>(url, options)
      .pipe(
        catchError(this.handleRatingDimensionsCallError)
      );
  }
}
