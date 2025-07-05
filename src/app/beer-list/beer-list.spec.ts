import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerList } from './beer-list';

describe('BeerList', () => {
  let component: BeerList;
  let fixture: ComponentFixture<BeerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
