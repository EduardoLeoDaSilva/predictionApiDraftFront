import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatiscasComponent } from './estatiscas.component';

describe('EstatiscasComponent', () => {
  let component: EstatiscasComponent;
  let fixture: ComponentFixture<EstatiscasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatiscasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatiscasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
