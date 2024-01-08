import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { Event } from 'nostr-typedef';
import { EventPacket } from 'rx-nostr';
import { Subscription } from 'rxjs';

import { EventService } from '../../../infrastructures/event.service';
import { UserProfileService } from '../../../shared/user-profile.service';
import { TextNoteComponent } from '../../views/text-note/text-note.component';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [NgFor, TextNoteComponent],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss',
})
export class TimeLineComponent implements OnInit, OnDestroy {
  events: Array<Event> = [];
  subscription: Subscription;

  constructor(
    private eventService: EventService,
    private userProfileService: UserProfileService
  ) {
    this.subscription = this.eventService.forwardReqObservable.subscribe(
      (packet: EventPacket) => {
        let event = packet.event;
        this.events.push(event);
      }
    );
  }

  ngOnInit() {
    this.eventService.reqTextNote();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
