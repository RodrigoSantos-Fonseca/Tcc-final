import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AulaDescricaoPage } from './aula-descricao.page';

describe('AulaDescricaoPage', () => {
  let component: AulaDescricaoPage;
  let fixture: ComponentFixture<AulaDescricaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AulaDescricaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
