import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {

  constructor(
    public router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('entered');
    // console.log(request.url);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    request = request.clone({
      headers
    });
    console.log(request);
    return next.handle(request).pipe(
      catchError(err => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      }), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);

      // TODO :  do the logout here.
      // console.log(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      // this.router.navigate(['/login'], { queryParams: { returnUrl: '' }});
    }
    // return an observable with a user-facing error message
    return throwError(error);

  }
}
