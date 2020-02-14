import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { DragDropService } from '../services';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Input() dragTag: string;
  @Input() dragData: any;
  @Input() draggedClass: string;
  private isDraggble = false; // 是否可拖动，默认不可拖动

  @Input('appDrag')
  set isDraggable(val: boolean) {
    this.isDraggble = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }

  get isDraggable() {
    return this.isDraggble;
  }

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private dds: DragDropService
  ) { }

  // 该事件在用户开始拖动元素时触发
  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.dds.setDragData({
        tag: this.dragTag,
        data: this.dragData
      });
    }
  }

  // 该事件在用户完成元素的拖动时触发
  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }

}
