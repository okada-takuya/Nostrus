import { Injectable } from '@angular/core';

import { EventPacket } from 'rx-nostr/types/src/packet';
import { Event, Content } from 'nostr-typedef';

import { Kind } from '../domain/kind';
import { EventService } from '../infrastructures/event.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfileMap: Map<string, Content.Metadata> = new Map<
    string,
    Content.Metadata
  >();

  constructor(private eventService: EventService) {
    console.log('UserProfileService is under construction');

    this.eventService.forwardReqObservable.subscribe((packet: EventPacket) => {
      let event = packet.event;
      if (!this.userProfileMap.has(event.pubkey)) {
        this.eventService.reqMetaData(event.pubkey);
      }
    });

    this.eventService.backwardReqObservable.subscribe((packet: EventPacket) => {
      let event: Event = packet.event;
      console.log('metadata coming');
      switch (event.kind) {
        case Kind.Metadata:
          let userProfile: Content.Metadata = JSON.parse(event.content);
          this.userProfileMap.set(event.pubkey, userProfile);
          break;

        default:
          console.log('unexpected event.');
          break;
      }
    });
  }

  getUserProfile(pubkey: string): Content.Metadata {
    return this.userProfileMap.get(pubkey) || {};
  }
}
