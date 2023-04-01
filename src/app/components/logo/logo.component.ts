import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  public logoPath = 'assets/images/logo.png';

  constructor() { }

  ngOnInit(): void {
  }

}
