import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../common/header/header.component';
import { LoaderService } from '../ui/loader/loader.service';
import { SwitchThemeService } from '../ui/theme/switch-theme.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HomeService } from '../service/home.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    HeaderComponent
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
    private switchTheme: SwitchThemeService,
    private homeService: HomeService
  ) {
    this.homeService.isOpen$.subscribe(value => {
      this.isSidebarOpen = value;
    });
   }

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
  toggleSidebar() {
    console.log('Toggling sidebar');
    this.isSidebarOpen = !this.isSidebarOpen;
    this.homeService.toggleIsOpen();
  }
}
