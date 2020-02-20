import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, map, reduce, switchMap } from 'rxjs/operators';
import { logger } from '../utils';
import { Config, Project, User } from './../models';

@Injectable()
export class UserService {
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

    // 查询（集合）
    getUsers(): Observable<User[]> {
        return this.http.get(`${this.api}/users`).pipe(
            logger('getUsers'),
            map(res => res as User[])
        );
    }

    // 查询（单个）
    getUser(userId: string): Observable<User> {
        return this.http.get(`${this.api}/users/${userId}`).pipe(
            logger('getUser'),
            map(res => res as User)
        );
    }

    // 查询（通过项目ID）
    getUsersByProjectId(projectId: string): Observable<User[]> {
        return this.http.get(`${this.api}/users`, {params: { members_like: projectId.toString() }}).pipe(
            logger('getUsersByProjectId'),
            map(res => res as User[])
        );
    }

    // 更新用户项目组（单个）
    updateUserOfProject(user: User, projectId: string): Observable<User> {
        if (user.id.includes(projectId)) {
            return of(user).pipe(
                logger('updateUserOfProject')
            );
        }
        const toUpdate = {
            projectIds: [...user.projectIds, projectId]
        };
        return this.http.patch(`${this.api}/users/${user.id}`, JSON.stringify(toUpdate), {headers: this.headers}).pipe(
            logger('updateUserOfProject'),
            map(res => res as User)
        );
    }

    // 删除用户项目组（单个）
    deleteUserOfProject(user: User, projectId: string): Observable<User> {
        if (user.id.includes(projectId)) {
            return of(user).pipe(
                logger('deleteUserOfProject')
            );
        }
        const toUpdate = {
            projectIds: user.projectIds.filter(id => id !== projectId)
        };
        return this.http.patch(`${this.api}/users/${user.id}`, JSON.stringify(toUpdate), {headers: this.headers}).pipe(
            logger('updateUserOfProject'),
            map(res => res as User)
        );
    }

    // 批量更新用户项目组
    updateBatchUserOfProject(project: Project): Observable<User[]> {
        return from(project.members || []).pipe(
            switchMap(userId => this.getUser(userId)),
            filter((user: User) => !user.projectIds.includes(project.id)),
            switchMap((flUser: User) => this.updateUserOfProject(flUser, project.id)),
            reduce((lists: User[], item: User) => [...lists, item], [])
        );
    }

}
