import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { Event } from 'nostr-typedef';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { UserProfileService } from '../../../shared/user-profile.service';

@Component({
  selector: 'app-text-note',
  standalone: true,
  imports: [NgIf, UserIconComponent],
  templateUrl: './text-note.component.html',
  styleUrl: './text-note.component.scss',
})
export class TextNoteComponent {
  @Input() event?: Event;

  constructor(private userProfileService: UserProfileService) {}

  getUserPictureSrc(): string {
    if (this.event != null) {
      return this.userProfileService.getUserPictureSrc(this.event?.pubkey);
    } else {
      console.log('event is null!');
      return '';
    }
  }
}
