import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


// aula.service.ts
export class TesteService {
  aulas: any[] = [
    {
      id: 1,
      nome: 'pw',
      hora_inicio: "14:00",
      hora_fim: "15:00",
      data: "15/12/2024",
      professor: "Giovanni",
      sala: "lab",
      qtd: 5,
      descricao: '',
      aluno: [
        { id: 1, nome: "Diogo", aceite: false },
        { id: 2, nome: "Ana", aceite: true },
        { id: 3, nome: "Carlos", aceite: true },
        { id: 4, nome: "Beatriz", aceite: false },
        { id: 5, nome: "Eduardo", aceite: true }
      ]
    },
    {
      id: 2,
      nome: 'Math',
      hora_inicio: "10:00",
      hora_fim: "11:00",
      data: "15/12/2024",
      professor: "Mariana",
      sala: "sala 2",
      qtd: 20,
      descricao: 'Aula de matemática básica.',
      aluno: [
        { id: 6, nome: "Pedro", aceite: true },
        { id: 7, nome: "Joana", aceite: true },
        { id: 8, nome: "Miguel", aceite: false },
        { id: 9, nome: "Fernanda", aceite: true }
      ]
    },
    {
      id: 3,
      nome: 'History',
      hora_inicio: "12:00",
      hora_fim: "13:00",
      data: "15/12/2024",
      professor: "Lucas",
      sala: "sala 3",
      qtd: 18,
      descricao: 'Aula sobre história moderna.',
      aluno: [
        { id: 10, nome: "Lara", aceite: true },
        { id: 11, nome: "Roberto", aceite: true },
        { id: 12, nome: "Sofia", aceite: true },
        { id: 13, nome: "Ricardo", aceite: false }
      ]
    },
    {
      id: 4,
      nome: 'Science',
      hora_inicio: "09:00",
      hora_fim: "10:00",
      data: "16/12/2024",
      professor: "Ana",
      sala: "sala 4",
      qtd: 22,
      descricao: 'Aula de ciências.',
      aluno: [
        { id: 14, nome: "Bruna", aceite: true },
        { id: 15, nome: "Thiago", aceite: false },
        { id: 16, nome: "Clara", aceite: true },
        { id: 17, nome: "Leonardo", aceite: true }
      ]
    },
    {
      id: 5,
      nome: 'English',
      hora_inicio: "11:00",
      hora_fim: "12:00",
      data: "16/12/2024",
      professor: "Carlos",
      sala: "lab 2",
      qtd: 25,
      descricao: 'Aula de inglês.',
      aluno: [
        { id: 18, nome: "Marcos", aceite: false },
        { id: 19, nome: "Aline", aceite: true },
        { id: 20, nome: "Gabriel", aceite: true },
        { id: 21, nome: "Renata", aceite: true }
      ]
    },
    {
      id: 6,
      nome: 'Geography',
      hora_inicio: "13:00",
      hora_fim: "14:00",
      data: "16/12/2024",
      professor: "Patrícia",
      sala: "sala 5",
      qtd: 28,
      descricao: 'Aula de geografia.',
      aluno: [
        { id: 22, nome: "Juliana", aceite: true },
        { id: 23, nome: "Felipe", aceite: true },
        { id: 24, nome: "Gustavo", aceite: true },
        { id: 25, nome: "Isabela", aceite: false }
      ]
    },
    {
      id: 7,
      nome: 'Physics',
      hora_inicio: "14:00",
      hora_fim: "15:00",
      data: "17/12/2024",
      professor: "Daniel",
      sala: "lab 3",
      qtd: 30,
      descricao: 'Aula de física.',
      aluno: [
        { id: 26, nome: "Rodrigo", aceite: true },
        { id: 27, nome: "Larissa", aceite: true },
        { id: 28, nome: "Vinicius", aceite: false },
        { id: 29, nome: "Patrícia", aceite: true }
      ]
    },
    {
      id: 8,
      nome: 'Biology',
      hora_inicio: "09:00",
      hora_fim: "10:00",
      data: "17/12/2024",
      professor: "Raquel",
      sala: "sala 6",
      qtd: 15,
      descricao: 'Aula de biologia.',
      aluno: [
        { id: 30, nome: "Fernanda", aceite: true },
        { id: 31, nome: "Rafael", aceite: true },
        { id: 32, nome: "Luana", aceite: true },
        { id: 33, nome: "Bruno", aceite: false }
      ]
    },
    {
      id: 9,
      nome: 'Chemistry',
      hora_inicio: "11:00",
      hora_fim: "12:00",
      data: "17/12/2024",
      professor: "Fernanda",
      sala: "sala 7",
      qtd: 27,
      descricao: 'Aula de química.',
      aluno: [
        { id: 34, nome: "Ingrid", aceite: true },
        { id: 35, nome: "Matheus", aceite: true },
        { id: 36, nome: "Andreia", aceite: false },
        { id: 37, nome: "Guilherme", aceite: true }
      ]
    },
    {
      id: 10,
      nome: 'Art',
      hora_inicio: "13:00",
      hora_fim: "14:00",
      data: "18/12/2024",
      professor: "Paula",
      sala: "sala 8",
      qtd: 18,
      descricao: 'Aula de arte.',
      aluno: [
        { id: 38, nome: "Camila", aceite: true },
        { id: 39, nome: "Caio", aceite: true },
        { id: 40, nome: "Tatiana", aceite: false },
        { id: 41, nome: "Samuel", aceite: true }
      ]
    },
  ]
  

  getGroupedAulas() {
    const grouped: { [key: string]: any[] } = {};

    this.aulas.forEach(aula => {
      const date = aula.data;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(aula);
    });

    return Object.keys(grouped).map(date => ({
      date,
      aulas: grouped[date]
    }));
  }



  
}
