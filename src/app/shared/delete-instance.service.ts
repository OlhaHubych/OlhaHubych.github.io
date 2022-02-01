import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteInstanceService {

  constructor() { }

  deleteInstance(arrInst: any [], baseInstanceId: number) {

    for(let i = 0; i < arrInst.length; i++) {
      if(arrInst[i].id == baseInstanceId) {
        arrInst.splice(i, 1);
      }
    }
    return arrInst;

  }
}
