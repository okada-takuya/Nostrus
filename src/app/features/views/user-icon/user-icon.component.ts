import { Component, Input } from '@angular/core';
import { UserProfileService } from '../../../shared/user-profile.service';

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
