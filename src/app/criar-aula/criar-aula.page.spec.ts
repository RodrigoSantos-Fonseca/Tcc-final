import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarAulaPage } from './criar-aula.page';

describe('CriarAulaPage', () => {
  let component: CriarAulaPage;
  let fixture: ComponentFixture<CriarAulaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CriarAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
