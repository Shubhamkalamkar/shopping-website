import { Injectable } from '@angular/core';
import Snackbar from 'awesome-snackbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { SwitchThemeService } from '../theme/switch-theme.service';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private mediaMatcher: MediaMatcher,
    private switchTheme: SwitchThemeService
  ) {}

  showToastSuccess(message: string) {
    const snackbar = new Snackbar(message);
    Promise.resolve().then(() =>
      this.switchTheme.getLoaderState().subscribe((state: boolean) => {
        if (state) {
          snackbar.setTheme('light');
          snackbar.setStyle({
            container: [['background-color', '#232629']],
            message: [
              ['color', '#0f9103'],
              ['font-size', '1.2rem'],
            ],
          });
        } else {
          snackbar.setTheme('dark');
          snackbar.setStyle({
            container: [['background-color', '#232629']],
            message: [
              ['color', '#11ff00'],
              ['font-size', '1.2rem'],
            ],
          });
        }
      })
    );

    snackbar.setPosition('bottom-right');
    snackbar.setIconSrc('../../../assets/Success.png');
    if (this.mediaMatcher.matchMedia(`(max-width: 1024px)`).matches) {
      snackbar.setPosition('bottom-center');
    }
  }

  showToastError(message: string) {
    const snackbar = new Snackbar(message);
    Promise.resolve().then(() =>
      this.switchTheme.getLoaderState().subscribe((state: boolean) => {
        if (state) {
          snackbar.setTheme('light');
          snackbar.setStyle({
            container: [['background-color', '#232629']],
            message: [
              ['color', '#ffffff'],
              ['font-size', '1.2rem'],
            ],
          });
        } else {
          snackbar.setTheme('dark');
          snackbar.setStyle({
            container: [['background-color', '#ffffff']],
            message: [
              ['color', '#000000'],
              ['font-size', '1.2rem'],
            ],
          });
        }
      })
    );
    snackbar.setPosition('bottom-right');

    snackbar.setIconSrc('../../../assets/error.png');
    if (this.mediaMatcher.matchMedia(`(max-width: 1024px)`).matches) {
      snackbar.setPosition('bottom-center');
    }
  }
}
