import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { Event } from 'nostr-typedef';
import { UserIconComponent } from '../user-icon/user-icon.component';
import { MetadataStoreService } from '../../../shared/metadata-store.service';

@Component({
  selector: 'app-text-note',
  standalone: true,
  imports: [NgIf, UserIconComponent],
  templateUrl: './text-note.component.html',
  styleUrl: './text-note.component.scss',
})
export class TextNoteComponent implements OnInit {
  @Input() event!: Event;
  userName: string = '';
  userPicture: string = '';
  created_at: string = '';

  constructor(private metadataStoreService: MetadataStoreService) {}

  ngOnInit() {
    // TODO: UserProfileの変動にサブスクしないとたぶん画面に出ないと思われる
    // TODO: MetaData、EventDataのストレージサービスを作る
    // TODO: 各ストレージサービス（特にMetaData）にキーでデータを問い合わせて、
    //       あればすぐデータ取得、なければサブスクしてまつようにする⇒async/awaitでよくないか？
    this.metadataStoreService
      .observeMetadataOf(this.event.pubkey)
      .subscribe((metadata) => {
        this.userName = metadata.name || 'ななしさん';
        this.userPicture = metadata.picture || '';
      });

    this.created_at = TextNoteComponent.convertUnixTimestampToDateTime(
      this.event.created_at
    );
  }

  private static convertUnixTimestampToDateTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Unixタイムスタンプはミリ秒ではなく秒で与えられるため、ミリ秒に変換する
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDateTime;
  }
}
