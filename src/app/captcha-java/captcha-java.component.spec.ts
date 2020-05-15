import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaJavaComponent } from './captcha-java.component';

describe('CaptchaJavaComponent', () => {
  let component: CaptchaJavaComponent;
  let fixture: ComponentFixture<CaptchaJavaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaJavaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaJavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
