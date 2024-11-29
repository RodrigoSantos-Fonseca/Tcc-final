import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  constructor(private firestore: Firestore) {}

  async insert(data: any, collectionName: string): Promise<void> {
    const collectionRef = collection(this.firestore, collectionName);
    await addDoc(collectionRef, data);
  }

  async fetchAll(collectionName: string): Promise<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  }

  async update(id: string, data: any, collectionName: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    await updateDoc(docRef, data);
  }

  async delete(id: string, collectionName: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    await deleteDoc(docRef);
  }

  async fetchById(id: string, collectionName: string): Promise<any> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      throw new Error('Document not found');
    }
  }
}
