import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DragData } from '@models/index';

@Injectable()
export class DragDropService {
    private dragData = new BehaviorSubject<DragData>(null);

    // 设置拖拽数据
    setDragData(data: DragData) {
        this.dragData.next(data);
    }

    // 获取拖拽数据
    getDragData(): Observable<DragData> {
        return this.dragData.asObservable();
    }

    // 清空拖拽数据
    clearDragData() {
        this.dragData.next(null);
    }

}
