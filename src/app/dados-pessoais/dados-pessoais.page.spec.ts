import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadosPessoaisPage } from './dados-pessoais.page';

describe('DadosPessoaisPage', () => {
  let component: DadosPessoaisPage;
  let fixture: ComponentFixture<DadosPessoaisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DadosPessoaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
