import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  error: any;

  private errorSubscription: Subscription;

  isLoading: boolean = false;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe((err) => {
      this.error = err;
    })
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request

    this.postService.createandStorePost(postData);
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts()
      .subscribe((data) => {
        this.loadedPosts = data;
        console.log(this.loadedPosts);
        this.isLoading = false;
      }, (error) => {
        console.log(error);
        this.error = error.statusText;
        this.isLoading = false;
        console.log(this.loadedPosts);
      });
    ;
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

  handleError(){
    this.error = null;
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}
