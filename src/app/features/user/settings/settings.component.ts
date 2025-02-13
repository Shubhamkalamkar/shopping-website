import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-container">
      <h2>Account Settings</h2>
      <div class="settings-sections">
        <!-- Settings sections will be added here -->
        <p>Settings options coming soon!</p>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    h2 {
      margin-bottom: 2rem;
    }
    .settings-sections {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class SettingsComponent {}
