import { trigger, state, style, transition, animate, group } from '@angular/animations';

// API 文档: https://angular.cn/guide/animations
export const slide = trigger('slide', [
    state('void', style({position: 'fixed', width: '100%', height: '80%'})),
    state('*', style({position: 'fixed', width: '100%', height: '80%'})),
    transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        group([
            animate('.5s ease-in-out', style({transform: 'translateX(0)'})),
            animate('.5s ease-in-out', style({opacity: 1})),
        ])
    ]),
    transition(':leave', [
        style({transform: 'translateX(0)'}),
        group([
            animate('.5s ease-in-out', style({transform: 'translateX(100%)'})),
            animate('.5s ease-in-out', style({opacity: 0}))
        ]),
    ]),
]);
