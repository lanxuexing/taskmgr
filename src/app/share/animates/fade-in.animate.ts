import { trigger, transition, query, style, animate, stagger } from '@angular/animations';

// API 文档: https://angular.cn/guide/animations
export const fadeIn = trigger('fadeIn', [
    transition('* => *', [
        query(':enter', style({opacity: 0}), { optional: true }),
        query(':enter', stagger(100, [
            animate('1s', style({opacity: 1}))
        ]), { optional: true }),
        query(':leave', style({opacity: 1}), { optional: true }),
        query(':leave', stagger(100, [
            animate('1s', style({opacity: 0}))
        ]), { optional: true }),
    ])
]);
