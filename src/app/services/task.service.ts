import { Injectable } from '@angular/core';
import { List } from '../models/list-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  lists: List[] = [];

  constructor() {
    this.loadStorage();
   }

createList(titulo: string){
  const newList = new List(titulo);
  this.lists.push(newList);
  this.saveStorage();

  return newList.id;
 }


 getList(id: string | number ){
   id = Number(id);
   return this.lists.find (listData => listData.id === id);
 }


 //Guarda el dato en localStorage
 saveStorage(){
   //JSON.stringify: Convierte la lista  a string
    localStorage.setItem('data', JSON.stringify(this.lists));
 }

 //Recarga el localStorage
 loadStorage(){
   //JSON.parse: Convierte el string a lista
   if (localStorage.getItem('data')){
    this.lists = JSON.parse(localStorage.getItem('data'));
   } else {
     this.lists = [];
   }
 }

 deleteList(list: List){
  this.lists = this.lists.filter( listData => {
   return listData.id !== list.id;
  });
  this.saveStorage();
 }

}
