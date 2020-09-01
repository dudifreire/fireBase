import { Mensagem, DaoService } from './../dao.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public text = " ";
  public messageData: Observable<Mensagem[]>;

  message: Mensagem = {
    usuario: 'Eduardo',
    mensagem: ' ',
    dataHora: new Date(Date.now()).toLocaleString().split(',')[0]

  };






  constructor(private DaoService: DaoService) { }

   sendMessage(Mensagem: Mensagem){
    this.DaoService.addMessage(this.message);

   }
   deleteMessage(item){
    this.DaoService.deleteMessage(item);
   }





  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {


     // this.DaoService.getMessageDatas(this.id).subscribe(data => {
     // this.message =  data;
    //});

      this.messageData = this.DaoService.getMessageData();

  }

}



