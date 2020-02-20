import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { concat, from, Observable } from 'rxjs';
import { map, mapTo, mergeMap, reduce } from 'rxjs/operators';
import { logger } from '../utils';
import { Config, Task, TaskDetail } from './../models';

@Injectable()
export class TaskService {
    private api: string;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    });

    constructor(
        private http: HttpClient,
        @Inject('BASE_CONFIG') private config: Config
    ) {
        this.api = this.config.api;
    }

    // 添加单个任务集
    addTask(task: Task): Observable<Task> {
        task.id = null;
        return this.http.post(`${this.api}/tasks`, JSON.stringify(task), {headers: this.headers}).pipe(
            logger('addTask'),
            map(res => res as Task)
        );
    }

    // 更新单个任务集
    updateTask(task: Task): Observable<Task> {
        const toUpdate = {
            name: task.name
        };
        return this.http.patch(`${this.api}/tasks/${task.id}`, JSON.stringify(toUpdate), {headers: this.headers}).pipe(
            logger('updateTask'),
            map(res => res as Task)
        );
    }

    // 删除单个任务集
    deleteTask(task: Task): Observable<Task> {
        return this.http.delete(`${this.api}/tasks/${task.id}`).pipe(
            logger('deleteTask'),
            mapTo(task)
        );
    }

    // 查询
    getTask(projectId: string): Observable<Task[]> {
        return this.http.get(`${this.api}/tasks`, {params: { projectId: projectId.toString() }}).pipe(
            logger('getTask'),
            map(res => res as Task[])
        );
    }

    // 交换任务集Order
    swapOrder(src: Task, target: Task): Observable<Task[]> {
        const dragUri = `${this.api}/tasks/${src.id}`;
        const dropUri = `${this.api}/tasks/${target.id}`;
        const drag$ = this.http.patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers}).pipe(
            logger('swap drag'),
            map(res => res)
        );
        const drop$ = this.http.patch(dropUri, JSON.stringify({order: src.order}), {headers: this.headers}).pipe(
            logger('swap drop'),
            map(res => res)
        );
        return concat(drag$, drop$).pipe(
            logger('swap drag-drop'),
            reduce((arr, item) => [...arr, item], [])
        );
    }

    // 添加单个任务
    addTaskDetail(taskDetail: TaskDetail): Observable<Task> {
        taskDetail.id = null;
        return this.http.post(`${this.api}/taskDetails`, JSON.stringify(taskDetail), {headers: this.headers}).pipe(
            logger('addTaskDetail'),
            map(res => res as Task)
        );
    }

    // 更新单个任务
    updateTaskDetail(taskDetail: TaskDetail): Observable<TaskDetail> {
        const toUpdate = {
            desc: taskDetail.desc,
            priority: taskDetail.priority,
            dueDate: taskDetail.dueDate,
            reminder: taskDetail.reminder,
            ownerID: taskDetail.ownerId,
            participantIds: taskDetail.participantIds,
            remark: taskDetail.remark
        };
        return this.http.patch(`${this.api}/taskDetails/${taskDetail.id}`, JSON.stringify(toUpdate), {headers: this.headers}).pipe(
            logger('updateTaskDetail'),
            map(res => res as TaskDetail)
        );
    }

    // 删除单个任务
    deleteTaskDetail(taskDetail: TaskDetail): Observable<TaskDetail> {
        return this.http.delete(`${this.api}/taskDetails/${taskDetail.id}`).pipe(
            logger('deleteTaskDetail'),
            mapTo(taskDetail)
        );
    }

    // 获取单个任务
    getTaskDetail(taskId: string): Observable<TaskDetail[]> {
        return this.http.get(`${this.api}/taskDetails`, {params: { taskId }}).pipe(
            logger('getTaskDetail'),
            map(res => res as TaskDetail[])
        );
    }

    // 通过任务集IDs批量获取任务列表
    getTaskDetailByTasks(tasks: Task[]): Observable<TaskDetail[]> {
        return from(tasks).pipe(
            mergeMap(task => this.getTaskDetail(task.id)),
            reduce((lists: TaskDetail[], item: TaskDetail[]) => [...lists, ...item], []),
            logger('getTaskDetailByTasks')
        );
    }

    // 完成任务集下单个任务
    completeTaskDetail(taskDetail: TaskDetail): Observable<TaskDetail> {
        const toUpdate = {
            completed: !taskDetail.completed
        };
        return this.http.patch(`${this.api}/taskDetails/${taskDetail.id}`, JSON.stringify(toUpdate), {headers: this.headers}).pipe(
            logger('completeTaskDetail'),
            map(res => res as TaskDetail)
        );
    }

    // 移动任务集下单个任务
    moveTaskDetail(taskDetailId: string, taskId: string): Observable<TaskDetail> {
        const toUpdate = {
            taskId
        };
        return this.http.patch(`${this.api}/taskDetails/${taskDetailId}`, JSON.stringify(toUpdate), {headers: this.headers}).pipe(
            logger('moveTaskDetail'),
            map(res => res as TaskDetail)
        );
    }

    // 移动任务集下所有任务
    moveAllTaskDetail(srcTaskId: string, targetTaskId: string): Observable<TaskDetail[]> {
        return this.getTaskDetail(srcTaskId).pipe(
            mergeMap(taskDetailList => from(taskDetailList)),
            mergeMap(taskDetail => this.moveTaskDetail(taskDetail.id, targetTaskId)),
            reduce((lists: TaskDetail[], item: TaskDetail) => [...lists, item], []),
            logger('moveAllTaskDetail')
        );
    }

}
