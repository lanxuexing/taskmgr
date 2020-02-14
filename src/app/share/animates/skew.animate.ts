import { trigger, state, style, transition, animate } from '@angular/animations';

// API 文档: https://angular.cn/guide/animations
export const skew = trigger('skew', [
    state('out', style({transform: 'scale(1)', 'box-shadow': 'none'})),
    state('hover', style({transform: 'scale(1.01)', 'box-shadow': '3px 3px 5px 6px #CCC'})),
    transition('out => hover', animate('100ms ease-in')),
    transition('hover => out', animate('100ms ease-out')),
]);
