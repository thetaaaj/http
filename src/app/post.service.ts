import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';

import { map,catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL: string = 'https://ng-learn-http-5689d-default-rtdb.firebaseio.com/posts.json';

  error = new Subject<string>();
  constructor(private http: HttpClient) { }

  createandStorePost(post: Post) {
    console.log(post)
    return this.http.post(this.URL, post);
  }

  fetchPosts() {
    return this.http.get(this.URL,
      {
        headers: new HttpHeaders({'Custom-Header':'Hello'}),
        params : new HttpParams().set('print','pretty')
      }
      )
      .pipe(map((responseData) => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      }),
      catchError((errorRes)=>{
        return throwError(errorRes);
      })
      );
  }

deletePost(){
  return this.http.delete(this.URL);
}

}
