import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { RatingDimension, RatingText } from './dto'
import { Ratings } from './typ'

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

  rating: Ratings = {}
  resultRatingText: string = ''

  constructor(private http: HttpClient) {

  }

  onAiInputFocus(event: any) {
    this.focused = true
  }

  onAiInputBlur(event: any) {
    this.focused = false
  }

  onRatingChange(event: any) {
    this.rating[event.name] = event.value;
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

  onClickWriteReview(event: any) {

    this.ratingDimensions.forEach(r => {
      if (!(r.name in this.rating)) {
        this.rating[r.name] = 5
      }
    })

    const entires: ([string, number])[] = Object.entries(this.rating)

    this.getRating(
      this.topic,
      entires[0][0],
      entires[0][1],
      entires[1][0],
      entires[1][1],
      entires[2][0],
      entires[2][1],
      entires[3][0],
      entires[3][1],
      entires[4][0],
      entires[4][1]
    ).subscribe((data: RatingText) => {
      this.resultRatingText = data.rating
    });
  }

  private handleHttpRequestError(error: HttpErrorResponse) {
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
      .set('topic', topic)
      .set('lang', 'en')

    const options: object = { params, headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' } };
    const url: string = 'http://localhost:8080/rating-dimensions';

    return this.http.get<Array<RatingDimension>>(url, options)
      .pipe(
        catchError(this.handleHttpRequestError)
      );
  }

  private getRating(topic: string,
                    dim1: string,
                    rating1: number,
                    dim2: string,
                    rating2: number,
                    dim3: string,
                    rating3: number,
                    dim4: string,
                    rating4: number,
                    dim5: string,
                    rating5: number
  ): Observable<RatingText> {

    let params = new HttpParams()
      .set('topic', topic)
      .set('dim1', dim1)
      .set('rating1', rating1)
      .set('dim2', dim2)
      .set('rating2', rating2)
      .set('dim3', dim3)
      .set('rating3', rating3)
      .set('dim4', dim4)
      .set('rating4', rating4)
      .set('dim5', dim5)
      .set('rating5', rating5)

    const options: object = { params };
    const url: string = 'http://localhost:8080/rating';

    return this.http.get<RatingText>(url, options)
      .pipe(
        catchError(this.handleHttpRequestError)
      );
  }
}
