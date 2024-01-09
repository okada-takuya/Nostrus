import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTimelineEventStoreComponent } from './home-timeline-event-store.component';

describe('HomeTimelineEventStoreComponent', () => {
  let component: HomeTimelineEventStoreComponent;
  let fixture: ComponentFixture<HomeTimelineEventStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTimelineEventStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTimelineEventStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
