import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL: string = 'https://ng-learn-http-5689d-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) { }

  createandStorePost(post: Post) {
    console.log(post)
    return this.http.post(this.URL, post);
  }

  fetchPosts() {
    return this.http.get(this.URL)
      .pipe(map((responseData) => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      }));
  }

deletePost(){
  return this.http.delete(this.URL);
}

}
