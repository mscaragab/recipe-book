import { Directive, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnInit {

  @HostBinding('style.backgroundColor') color;

  constructor() { }

  ngOnInit(): void {
    this.color = 'lightgreen';
  }
}
