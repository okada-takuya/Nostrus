import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.scss',
})
export class UserIconComponent {
  // TODO: default iconの設定
  @Input() picture: string = '';
}
