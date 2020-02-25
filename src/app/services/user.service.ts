import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, map, reduce, mergeMap, switchMap, tap, take } from 'rxjs/operators';
import { logger } from '@utils/index';
import { Config, Project, User } from '@models/index';

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

    // 通过邮箱查询（单个）
    getUserByEmail(email: string): Observable<User> {
        return this.http.get(`${this.api}/users`, {params: {email}}).pipe(
            logger('getUserByEmail'),
            map(res => res as User)
        );
    }

    // 通过邮箱查询（多个）
    getUsersByEmail(email: string): Observable<User[]> {
        return this.http.get(`${this.api}/users`, {params: {'email_like': email}}).pipe(
            logger('getUserByEmail'),
            map(res => res as User[])
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
        let srcMembers = [];
        this.http.patch(`${this.api}/projects/${project.id}`, JSON.stringify(project), {headers: this.headers}).pipe(
            take(1)
        ).subscribe();
        return from(project.members || []).pipe(
            mergeMap(id => this.getUser(id)),
            mergeMap((fUser: User) => {
                const toUpdate = {projectIds: fUser.projectIds.indexOf(project.id) === -1 ? [...fUser.projectIds, project.id] : [project.id]};
                return this.http.patch(`${this.api}/users/${fUser.id}`, JSON.stringify(toUpdate), {headers: this.headers})
            }),
            reduce((lists: User[], item: User) => [...lists, item], []),
            tap(result => srcMembers = result),
            switchMap(_ => {
                return this.http.get(`${this.api}/users`, {params: {projectIds_like: project.id}}).pipe(
                    switchMap((u: User[]) => {
                        return from(u).pipe(
                            filter((user: User) => project.members.indexOf(user.id) === -1),
                            mergeMap((fUser: User) => {
                                const toUpdate = fUser.projectIds ? {projectIds: fUser.projectIds.filter((v: string) => v !== project.id)} : {};
                                return this.http.patch(`${this.api}/users/${fUser.id}`, JSON.stringify(toUpdate), {headers: this.headers})
                            }),
                            reduce((lists: User[], item: User) => [...lists, item], []),
                            map(result => {
                                if (result && result.length === 0) {
                                    return srcMembers;
                                } else {
                                    return result;
                                }
                            }),
                            logger('updateBatchUserOfProject')
                        );
                    })
                );
            })
        );
    }

}
