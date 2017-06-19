import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHideColumn]'
})
export class HideColumnDirective implements OnInit {
  @Input() appHideColumn: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.appHideColumn === true) {
      this.renderer.addClass(this.el.nativeElement, 'hidden-xs');
      this.renderer.addClass(this.el.nativeElement, 'hidden-sm');
    }
  }
}
