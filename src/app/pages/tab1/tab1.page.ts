import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public taskService: TaskService,
              private router: Router,
              private alertController: AlertController) {}

async addList() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Nueva lista',
    inputs: [
      {
        name:'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler:() => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Crear',
        handler: ( data ) => {
          console.log(data);
          if (data.titulo.length === 0){
            return;
          }
          const listId = this.taskService.createList(data.titulo);

          //Crea la lista del item
          this.router.navigateByUrl(`/tabs/tab1/add/${ listId }`);
        }
      }
    ]
  });

  alert.present();
}
}
