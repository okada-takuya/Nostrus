import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextNoteComponent } from './text-note.component';

describe('TextNoteComponent', () => {
  let component: TextNoteComponent;
  let fixture: ComponentFixture<TextNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
