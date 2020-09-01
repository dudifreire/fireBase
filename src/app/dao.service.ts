import { AngularFireModule } from '@angular/fire';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map , take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { promise } from 'protractor';

export interface Mensagem {
 id?: string;
 usuario: string;
 mensagem: string;
 dataHora: string;
}

@Injectable({
  providedIn: 'root'
})
export class DaoService {
 private messageData: Observable<Mensagem[]>;
 private messageDataCollection: AngularFirestoreCollection<Mensagem>;
  constructor(private db: AngularFirestore) {
    this.messageDataCollection = this.db.collection<Mensagem>('messageData');
    this.messageData = this.messageDataCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
   }



  getMessageData(): Observable<Mensagem[]> {
   return this.messageData;
  }

  getMessageDatas(id: string): Observable<Mensagem> {
    return this.messageDataCollection.doc<Mensagem>(id).valueChanges().pipe(
      take(1),
      map(messageData => {
        messageData.id = id;
        return messageData;
      })
    );
  }

  addMessage(messageData: Mensagem): Promise<DocumentReference> {
    return this.messageDataCollection.add(messageData);

  }

  updateMessage(messageData: Mensagem): Promise<void> {
    return this.messageDataCollection.doc(messageData.id).update({mensagem: messageData.mensagem});
  }

  deleteMessage(id: string): Promise<void> {
    return this.messageDataCollection.doc(id).delete();
  }


}
