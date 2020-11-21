import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('click') open() {
    this.isOpen = !this.isOpen;
    if (
      (<HTMLElement>this.elementRef.nativeElement).querySelector(
        '.dropdown-menu'
      )
    ) {
      if (this.isOpen) {
        this.renderer.addClass(this.elementRef.nativeElement, 'show');
        (<HTMLElement>this.elementRef.nativeElement)
          .querySelector('.dropdown-menu')
          .classList.add('show');
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, 'show');
        (<HTMLElement>this.elementRef.nativeElement)
          .querySelector('.dropdown-menu')
          .classList.remove('show');
      }
    }
  }
}
