import { Observable } from 'rxjs';
import { Mensagem, DaoService } from './../../dao.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  private messageData: Observable<Mensagem[]>;
  message: Mensagem = {
    usuario: 'Eduardo',
    mensagem: ' ',
    dataHora: Date.now()

  };


  // tslint:disable-next-line: no-shadowed-variable
  constructor(private DaoService: DaoService) { }

  ngOnInit() {
  this.messageData = this.DaoService.getMessageData();

  }

}
