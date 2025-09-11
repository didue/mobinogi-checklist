import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerManage } from './tracker-manage';

describe('TrackerManage', () => {
  let component: TrackerManage;
  let fixture: ComponentFixture<TrackerManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackerManage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerManage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
