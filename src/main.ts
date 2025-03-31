import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Initialize Preline UI components
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  import('preline/preline');
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
