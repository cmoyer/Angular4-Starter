import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColumnWidth]'
})
export class ColumnWidthDirective implements OnInit {
  @Input() appColumnWidth: number;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (typeof this.appColumnWidth === 'string') {
      this.renderer.setStyle(
        this.el.nativeElement,
        'width',
        this.appColumnWidth
      );
    }
  }
}
