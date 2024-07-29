import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCertificateComponent } from './show-certificate.component';

describe('ShowCertificateComponent', () => {
  let component: ShowCertificateComponent;
  let fixture: ComponentFixture<ShowCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCertificateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
