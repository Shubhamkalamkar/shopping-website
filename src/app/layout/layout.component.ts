import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../common/header/header.component';
import { NgClass } from '@angular/common';
import { LoaderService } from '../ui/loader/loader.service';
import { LoadingComponent } from '../ui/loader/loading.component';
import { SwitchThemeService } from '../ui/theme/switch-theme.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadingComponent,
    CommonModule,
    HeaderComponent,
    NgClass,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isLoading: boolean = false;
  isSidebarOpen: boolean = false;
  isLight: boolean = false;
  bgImage: string = 'bgImage.png';
  constructor(
    private loaderService: LoaderService,
    private switchTheme: SwitchThemeService
  ) { }

  ngOnInit(): void {
    Promise.resolve().then(() =>
      this.loaderService.getLoaderState().subscribe((state: boolean) => {
        this.isLoading = state;
      })
    );
    Promise.resolve().then(() =>
      this.switchTheme.getLoaderState().subscribe((state: boolean) => {
        this.isLight = state;
        if (this.isLight) {
          this.bgImage = 'bgImageDark2.png';
        } else {
          this.bgImage = 'bgImage2.png';
        }
      })
    );
  }

  openSidebar = () => {
    this.isSidebarOpen = true;
  };

  closeSidebar = () => {
    this.isSidebarOpen = false;
  };
}
