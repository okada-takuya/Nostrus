import { Injectable } from '@angular/core';
import { Content } from 'nostr-typedef';

@Injectable({
  providedIn: 'root',
})
export class MetadataStoreService {
  // private eventMap: Map<string, Content.Metadata> = new Map<
  //   string,
  //   Content.Metadata
  // >();
  // readonly eventObservable: ReplaySubject<Metadata> = new ReplaySubject();
  // constructor(private nostrApiService: NostrApiService) {
  //   this.nostrApiService.eventPacketsObservable.subscribe(
  //     (packet: EventPacket) => {
  //       this.eventMap.set(packet.event.id, packet.event);
  //       this.eventObservable.next(packet.event);
  //     }
  //   );
  // }
}
