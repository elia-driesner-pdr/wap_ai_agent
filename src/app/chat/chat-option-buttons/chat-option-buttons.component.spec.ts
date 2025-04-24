import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOptionButtonsComponent } from './chat-option-buttons.component';

describe('ChatOptionButtonsComponent', () => {
  let component: ChatOptionButtonsComponent;
  let fixture: ComponentFixture<ChatOptionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatOptionButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatOptionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
