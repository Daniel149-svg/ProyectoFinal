import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRepuestosPadreComponent } from './solicitud-repuestos-padre.component';

describe('SolicitudRepuestosPadreComponent', () => {
  let component: SolicitudRepuestosPadreComponent;
  let fixture: ComponentFixture<SolicitudRepuestosPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudRepuestosPadreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudRepuestosPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
