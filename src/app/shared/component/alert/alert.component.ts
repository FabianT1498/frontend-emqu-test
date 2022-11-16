import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({ selector: 'app-alert', templateUrl: './alert.component.html' })
export class AlertComponent implements OnInit, OnChanges {
  @Input()
  public message: string;

  ngOnInit(): void {
    console.log('Alert component present');
  }

  ngOnChanges(changes): void {
    console.log(changes);
  }
}
