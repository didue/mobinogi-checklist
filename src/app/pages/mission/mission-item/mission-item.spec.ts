import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionItem } from './mission-item';

describe('MissionItem', () => {
  let component: MissionItem;
  let fixture: ComponentFixture<MissionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
