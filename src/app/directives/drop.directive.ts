import { Directive, ElementRef, Renderer2, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { DragDropService } from '@services/index';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DragData } from '@models/index';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {
  @Input() draggedEnterClass: string;
  @Input() dropTags: string[] = [];
  @Output() dropped: EventEmitter<DragData> = new EventEmitter();
  private data$: Observable<DragData>;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private dds: DragDropService
  ) {
    this.data$ = this.dds.getDragData().pipe(
      take(1)
    );
  }

  // 该事件在拖动的元素进入放置目标时触发
  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe((dragData: DragData) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.draggedEnterClass);
        }
      });
    }
  }

  // 该事件在拖动元素在放置目标上时触发
  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe((dragData: DragData) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }

  // 该事件在拖动元素离开放置目标时触发
  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe((dragData: DragData) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.draggedEnterClass);
        }
      });
    }
  }

  // 该事件在拖动元素放置在目标区域时触发
  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe((dragData: DragData) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.draggedEnterClass);
          this.dropped.emit(dragData);
          this.dds.clearDragData();
        }
      });
    }
  }

}
