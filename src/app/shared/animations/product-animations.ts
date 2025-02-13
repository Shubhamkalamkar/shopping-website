import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 }))
  ])
]);

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0, transform: 'translateY(50px)' }),
        stagger('50ms',
          animate('500ms ease-out',
            style({ opacity: 1, transform: 'translateY(0px)' })))
      ],
      { optional: true }
    ),
    query(':leave',
      [stagger('50ms',
        animate('500ms ease-out',
          style({ opacity: 0, transform: 'translateY(50px)' })))
      ],
      { optional: true }
    )
  ])
]);

export const cardHover = trigger('cardHover', [
  transition(':enter', [
    style({ transform: 'scale(1)' }),
    animate('200ms ease-in', style({ transform: 'scale(1.05)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ transform: 'scale(1)' }))
  ])
]);

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('300ms ease-in', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
  ])
]);
