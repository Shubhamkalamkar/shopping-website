import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    // Component initialization logic
  }

  ngAfterViewInit() {
    // Ensure the video plays after the view is initialized
    if (this.heroVideo && this.heroVideo.nativeElement) {
      const videoElement = this.heroVideo.nativeElement;
      // Try to play the video
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video playback started successfully
            console.log('Video playback started successfully');
          })
          .catch(error => {
            // Auto-play was prevented
            console.error('Video playback was prevented:', error);
            
            // Add a click event listener to the document to enable playback on user interaction
            document.addEventListener('click', () => {
              videoElement.play();
            }, { once: true });
          });
      }
    }
  }
}