import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiodataComponent } from './audiodata.component';

describe('AudiodataComponent', () => {
  let component: AudiodataComponent;
  let fixture: ComponentFixture<AudiodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiodataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudiodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
