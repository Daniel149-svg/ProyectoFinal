import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRepuestosHijoComponent } from './formulario-repuestos-hijo.component';

describe('FormularioRepuestosHijoComponent', () => {
  let component: FormularioRepuestosHijoComponent;
  let fixture: ComponentFixture<FormularioRepuestosHijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRepuestosHijoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRepuestosHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
