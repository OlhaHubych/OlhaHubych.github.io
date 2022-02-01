import { Injectable } from '@angular/core';
import { DATAS } from '../components/main-page/class/data-instances';

@Injectable({
  providedIn: 'root'
})
export class GetInstancesDataService {

  constructor() { }

  takeInstances() {
    const datas = DATAS;
    return datas;
  }
}
