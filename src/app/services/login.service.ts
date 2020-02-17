import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config, Quote } from './../models';
import { logger } from '../utils';

@Injectable()
export class LoginService {
    api: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_CONFIG') private config: Config
    ) {
        this.api = this.config.api;
    }

    getQuote(): Observable<Quote> {
        return this.http.get(`${this.api}/quotes/${Math.floor(Math.random() * 10)}`).pipe(
            logger('getQuote'),
            map(res => res as Quote)
        );
    }

}
