import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { token } from '../configs';
import { logger } from '../utils';
import { Config, Quote, User } from './../models';
import { UserService } from './user.service';

@Injectable()
export class LoginService {
    api: string;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    });

    constructor(
        private http: HttpClient,
        @Inject('BASE_CONFIG') private config: Config,
        private userService: UserService
    ) {
        this.api = this.config.api;
    }

    // 获取每日一文
    getQuote(): Observable<Quote> {
        return this.http.get(`${this.api}/quotes/${Math.floor(Math.random() * 10)}`).pipe(
            logger('getQuote'),
            map(res => res as Quote)
        );
    }

    // 注册
    register(user: User): Observable<any> {
        return from(this.userService.getUserByEmail(user.email)).pipe(
            switchMap((result: any) => {
                if (result && result.length > 0) {
                    return of({msg: `${user.email}已经存在～`}).pipe(
                        logger('register')
                    );
                }
                return this.http.post(`${this.api}/users`, JSON.stringify(Object.assign({}, user, {token})), {headers: this.headers}).pipe(
                    map(res => res as User),
                    logger('register')
                );
            })
        );
    }

    // 登录
    login(username: string, password: string): Observable<any> {
        return this.http.get(`${this.api}/users`, {params: {email: username, password}}).pipe(
            map((res: any) => {
                if (!res || res.length === 0) {
                    return {msg: '用户名或者密错误～'};
                }
                return Object.assign({}, res[0], {
                    token
                }) as User;
            }),
            logger('login')
        );
    }

}
