import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../infrastructures/event.service';
import { EventPacket } from 'rx-nostr';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  events: EventPacket[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    console.log('observable' + this.eventService.observable);
    console.log('rxReq' + this.eventService.rxReq);

    let subscription = this.eventService.observable.subscribe(
      (packet: EventPacket) => {
        // app logic
        console.log(packet);
      }
    );

    console.log('sample');
    this.eventService.rxReq.emit({ kinds: [1] });

    // Send CLOSE message in 10 seconds
    setTimeout(() => {
      subscription.unsubscribe();
      console.log('unsubscribed!');
    }, 10 * 1000);
  }
}
