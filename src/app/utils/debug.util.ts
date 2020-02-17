import { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

// 参考文献：https://medium.com/javascript-everyday/rxjs-custom-operators-f8b9aeab9631
export function logger<T>(message: string): MonoTypeOperatorFunction<T> {
    return input$ => input$.pipe(
        tap(
            (next: any) => {
                if (!environment.production) {
                    console.log('Log日志: ', message, next);
                }
            },
            (error: any) => {
                if (!environment.production) {
                    console.error('Log日志: ', message, error);
                }
            },
            () => {
                if (!environment.production) {
                    console.timeStamp(`Log日志: ${message} Complate!`);
                }
            }
        )
    );
}
