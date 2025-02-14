import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ui-btn]',
  standalone: true,
})
export class UiBtnDirective implements OnInit {
  @Input({ required: false }) 'ui-btn':
    | 'primary'
    | 'danger'
    | 'warn'
    | 'success'
    | '';

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {
    this.addRequiredClassToHost();
  }

  private addRequiredClassToHost = () => {
    this._renderer.addClass(this._el.nativeElement, 'btn');
    let classBasedOnType: string = this['ui-btn'] ? this['ui-btn'] : '';
    if (classBasedOnType)
      this._renderer.addClass(
        this._el.nativeElement,
        `btn-${classBasedOnType}`
      );
  };
}
