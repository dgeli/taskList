import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list-model';
import { ItemList } from 'src/app/models/item-list.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  nameItem = '';

  constructor(private taskService: TaskService,
              private route: ActivatedRoute ) {
    
     const listId = this.route.snapshot.paramMap.get('listId');

    this.list = this.taskService.getList(listId);

   }

  ngOnInit() {
  }

  addItem(){
    if (this.nameItem.length === 0){
      return;
    }

    const newItem = new ItemList(this.nameItem);
    this.list.items.push(newItem);

    this.nameItem = '';
    this.taskService.saveStorage();

  }

  changeCheck( item: ItemList){
    //return all pending items
   const pending = this.list.items
   .filter(itemDate => {return !itemDate.complete; })
   .length;

    if (pending === 0){
      this.list.finishedIn = new Date();
      this.list.finished = true;
    } else {
      this.list.finishedIn = null;
      this.list.finished = false;
    }

    this.taskService.saveStorage();

    console.log(this.taskService.lists);
  }

  deleteItem(i: number){
    this.list.items.splice(i,1);
    this.taskService.saveStorage();
  }

}
