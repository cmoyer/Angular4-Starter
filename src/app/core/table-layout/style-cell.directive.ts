import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStyleCell]'
})
export class StyleCellDirective implements OnInit {
  @Input() appStyleCell: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

    if (this.appStyleCell === undefined) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'color',
        '#dcdcdc'
      );
      // this.renderer.setStyle(
      //   this.el.nativeElement,
      //   'text-align',
      //   'center'
      // );
    }
    if (typeof this.appStyleCell === 'number') {
      this.renderer.setStyle(
        this.el.nativeElement,
        'text-align',
        'left'
      );
    }
  }



}
