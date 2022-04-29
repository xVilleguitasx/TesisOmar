import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionAdminComponent } from './validacion-admin.component';

describe('ValidacionAdminComponent', () => {
  let component: ValidacionAdminComponent;
  let fixture: ComponentFixture<ValidacionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidacionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
