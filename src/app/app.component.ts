import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';

// import {  NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blogosphere';
  public spinkit = Spinkit;
  constructor()
  {}

  ngOnInit(): void {
    // this.ngxSpinnerService.show()
  }

}
