import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstancesFilterService {

  constructor() { }

  instanceFilter(arrayInst: any[], searchStr: string) {
    return arrayInst.filter(obj => {
      return obj.title.toLowerCase().includes(searchStr.toLocaleLowerCase());
    })
  }

  findSimilarInstances(arrayInst: any[], baseInstance: any): any {
    let result = [];
    let baseTempArray = (baseInstance.title.toLowerCase().split(" ")).concat(baseInstance.description.toLowerCase().split(" "));
    baseTempArray = [...new Set(baseTempArray)];//delete dublicates
    
    function excludeBaseObj(allObjs, idBaseObj) {
      return allObjs.filter(obj => {
        if (obj.id != idBaseObj) return obj;
      })
    };

    let arrayWithoutBaseObj = excludeBaseObj(arrayInst, baseInstance.id);

    //---------- similar --------------------
    for(let i = 0; i < arrayWithoutBaseObj.length; i++) {
      for(let j = 0; j < baseTempArray.length; j++) {
        if((arrayWithoutBaseObj[i].title.toLowerCase().split(" ")).includes(baseTempArray[j]) ||
          (arrayWithoutBaseObj[i].description.toLowerCase().split(" ")).includes(baseTempArray[j]) ) 
          {
          if(!result.includes(arrayWithoutBaseObj[i])) result.push(arrayWithoutBaseObj[i]);
        }
      }
    }
    
    return result;
  }
}
