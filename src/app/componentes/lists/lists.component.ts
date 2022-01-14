import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { List } from 'src/app/models/list-model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList) list: IonList;
  @Input() finished = true;

  constructor(public taskService: TaskService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}

  selectedList(list: List){
    if (this.finished){
      this.router.navigateByUrl(`/tabs/tab2/add/${ list.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${ list.id }`);
    }
  }

  deleteList(list: List){
    this.taskService.deleteList(list);
  }

  async editListName(list: List){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: list.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler:() => {
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: ( data ) => {
            if (data.titulo.length === 0){
              return;
            }
            
            list.title = data.titulo;
            this.taskService.saveStorage();
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }
}
