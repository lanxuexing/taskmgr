import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, mergeMap, count, switchMap } from 'rxjs/operators';
import { logger } from '../utils';
import { Config, Project } from './../models';

@Injectable()
export class ProjectService {
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

    // 查询
    getProject(userId: string): Observable<Project[]> {
        return this.http.get(`${this.api}/projects`, {params: { members_like: userId.toString() }}).pipe(
            logger('getProject'),
            map(res => res as Project[])
        );
    }

    // 添加
    addProject(project: Project): Observable<Project> {
        project.id = null;
        return this.http.post(`${this.api}/projects`, JSON.stringify(project), {headers: this.headers}).pipe(
            logger('addProject'),
            map(res => res as Project)
        );
    }

    // 更新
    updateProject(project: Project): Observable<Project> {
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http.patch(`${this.api}/projects/${project.id}`, JSON.stringify(toUpdate), {headers: this.headers}).pipe(
            logger('updateProject'),
            map(res => res as Project)
        );
    }

    // 删除
    deleteProject(project: Project): Observable<Project> {
        const deleteTasks$ = from(project.taskIds || []).pipe(
            mergeMap(taskId => this.http.delete(`${this.api}/tasks/${taskId}`)),
            count()
        );
        return deleteTasks$.pipe(
            switchMap(_ => this.http.delete(`${this.api}/projects/${project.id}`)),
            logger('deleteProject'),
            map(_ => project)
        );
    }

}
