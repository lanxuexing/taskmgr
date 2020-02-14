import { trigger, state, style, transition, animate } from '@angular/animations';

// API 文档: https://angular.cn/guide/animations
export const leftFloat = trigger('leftFloat', [
    state('in', style({'border-left-width': '8px'})),
    state('out', style({'border-left-width': '3px'})),
    transition('out => hover', animate('100ms ease-out')),
    transition('hover => hover', animate('100ms ease-in'))
]);
