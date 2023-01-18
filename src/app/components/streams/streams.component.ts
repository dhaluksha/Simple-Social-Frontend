import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  token: any;
  streamsTab = true;
  topStreamsTab = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});

  }
  ChangeTabs(value){
    if(value === 'streams') {
      this.streamsTab = true;
      this.topStreamsTab = false;
    }
    if(value === 'top') {
      this.streamsTab = false;
      this.topStreamsTab = true;
    }
  }

}
