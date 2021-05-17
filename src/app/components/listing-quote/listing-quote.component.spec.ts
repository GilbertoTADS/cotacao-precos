import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingQuoteComponent } from './listing-quote.component';

describe('ListingQuoteComponent', () => {
  let component: ListingQuoteComponent;
  let fixture: ComponentFixture<ListingQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
