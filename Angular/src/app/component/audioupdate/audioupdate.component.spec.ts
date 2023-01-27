import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioupdateComponent } from './audioupdate.component';

describe('AudioupdateComponent', () => {
  let component: AudioupdateComponent;
  let fixture: ComponentFixture<AudioupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
