import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { Event } from 'nostr-typedef';
import {
  EventPacket,
  createRxForwardReq,
  sort,
  timeline,
  uniq,
} from 'rx-nostr';

import { TextNoteComponent } from '../../views/text-note/text-note.component';
import { NostrApiService } from '../../../infrastructures/nostr-api.service';
import { Kind } from '../../../domain/kind';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [NgFor, TextNoteComponent],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss',
})
export class TimeLineComponent implements OnInit, OnDestroy {
  events: Array<Event> = [];
  private eventsReq = createRxForwardReq();
  private events$;

  constructor(private nostrApiService: NostrApiService) {
    this.events$ = this.nostrApiService.rxNostr
      .use(this.eventsReq)
      .pipe(
        uniq(),
        sort(0, (p1, p2) => {
          return p1.event.created_at - p2.event.created_at;
        })
      )
      .subscribe((packet) => {
        this.events.unshift(packet.event);
      });
  }

  ngOnInit() {
    this.eventsReq.emit({ kinds: [Kind.Text], limit: 100 });
  }

  ngOnDestroy() {
    this.events$.unsubscribe();
  }
}
