import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  isLoading:boolean = false;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createandStorePost(postData)
    .subscribe((data)=>{
      console.log(data);
      this.onFetchPosts();
    });
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts()
    .subscribe((data)=>{
      this.loadedPosts = data;
      this.isLoading = false;
    });
    ;
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost()
    .subscribe(()=>{
      this.loadedPosts = [];
    });
  }

}
