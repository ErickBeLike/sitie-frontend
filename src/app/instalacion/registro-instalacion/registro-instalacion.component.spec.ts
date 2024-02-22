import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInstalacionComponent } from './registro-instalacion.component';

describe('RegistroInstalacionComponent', () => {
  let component: RegistroInstalacionComponent;
  let fixture: ComponentFixture<RegistroInstalacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroInstalacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
