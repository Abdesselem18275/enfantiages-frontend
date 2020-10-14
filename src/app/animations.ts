import { trigger, transition, style, animate, animation, useAnimation } from '@angular/animations';

export const sideTranslateAnimation = trigger(
  'sideTranslateAnimation',
  [
    transition(
      ':enter',
      [
        style({ width: '0'}),
        animate('150ms ease-out',
          style({ width: '320px'})
                )
      ]
    ),
    transition(
      ':leave',
      [
        style({ width: '320px'}),
        animate('100ms ease-in',
           style({width: '0'})     )
      ]
    )
  ]
);