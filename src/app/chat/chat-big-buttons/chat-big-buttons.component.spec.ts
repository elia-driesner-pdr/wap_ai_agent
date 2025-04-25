import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBigButtonsComponent } from './chat-big-buttons.component';

describe('ChatBigButtonsComponent', () => {
  let component: ChatBigButtonsComponent;
  let fixture: ComponentFixture<ChatBigButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBigButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBigButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
