import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() loveIts: number;
  @Input() createdAt: Date;

  lastUpate = new Date();

  constructor() { }

  ngOnInit() {
  }

  onLovIt() {
    return this.loveIts++;
  }

  onDontLovIt() {
    return this.loveIts--;
  }
}
