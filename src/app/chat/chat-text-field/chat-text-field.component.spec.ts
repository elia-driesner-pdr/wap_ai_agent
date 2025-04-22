import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTextFieldComponent } from './chat-text-field.component';

describe('ChatTextFieldComponent', () => {
  let component: ChatTextFieldComponent;
  let fixture: ComponentFixture<ChatTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTextFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
