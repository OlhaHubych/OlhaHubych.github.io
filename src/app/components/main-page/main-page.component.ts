import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import {ElementRef,Renderer2} from '@angular/core';
import { GetInstancesDataService } from '../../shared/get-instances-data.service';
import { InstancesFilterService } from '../../shared/instances-filter.service';
import { DeleteInstanceService } from '../../shared/delete-instance.service';
import { FormatInstanceClass } from './class/format-instance-class';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  search: string;
  titleCopy: string;
  descriptionCopy: string;

  allGalleryInstances: FormatInstanceClass[];
  items: FormatInstanceClass[];
  editProcess: boolean = false;

  @ViewChildren('showEditFields') showEditFields: QueryList<ElementRef>;
  @ViewChildren('instance') instances: QueryList<ElementRef>;

  constructor(
    private getData: GetInstancesDataService,
    private instanceFilterService: InstancesFilterService,
    private deleteInstantService: DeleteInstanceService,
    private rd: Renderer2,

    ) { }
  loadedDATAS: FormatInstanceClass[] = this.getData.takeInstances();
  
  ngOnInit(): void {
    this.allGalleryInstances = this.loadedDATAS;
    this.items = this.allGalleryInstances.reverse();
  }

  addElementData(data: FormatInstanceClass) {
    
    let lastElem: number = this.allGalleryInstances.reverse().length;
    lastElem--;
    data.id = this.allGalleryInstances[lastElem].id + 1;
    this.allGalleryInstances.push(data);
    this.items = this.allGalleryInstances.reverse();

  }
  
  searchInstByTitle() {
    this.items = this.instanceFilterService.instanceFilter(this.allGalleryInstances.reverse(), this.search);
  }

  showSimilarInstances(baseInstance) {

   for(let i = 0; i < this.instances.toArray().length; i++) {
     if(this.instances.toArray()[i].nativeElement.id == baseInstance.id) {
        this.rd.setStyle(this.instances.toArray()[i].nativeElement, 'background-color', 'lightsteelblue');
     }
     else {
      this.rd.setStyle(this.instances.toArray()[i].nativeElement, 'background-color', 'white');
     }
   }
  
    let tempArr: FormatInstanceClass[] = [baseInstance];
    let filterResult = this.instanceFilterService.findSimilarInstances(this.allGalleryInstances, baseInstance);

    if(filterResult.length > 3) {
      this.items = tempArr.concat(filterResult.slice(0, 3));;
    }
    else {
      if(filterResult.length == 0) {
        alert(`No similar announcements`);
      }
      else {
        alert(`We found only ${filterResult.length} similars`);
      }
      
      this.items = tempArr.concat(filterResult);;
    }

  }

  deleteThisInstance(baseInstance) {
    this.items = this.deleteInstantService.deleteInstance(this.allGalleryInstances, baseInstance.id);
  }

  editThisInstance(baseInstance) { 
    let showEditFieldsArr = this.showEditFields.toArray();

    if(!this.editProcess) {
      this.editProcess = true;
     
      showEditFieldsArr.forEach(iElem => {
        if(iElem.nativeElement.id == baseInstance.id) {
          iElem.nativeElement.hidden = false;
        }
      });
      this.titleCopy = baseInstance.title;
      this.descriptionCopy = baseInstance.description;
    }
    else {
      showEditFieldsArr.forEach(iElem => {
        if(iElem.nativeElement.id == baseInstance.id) {
          if(iElem.nativeElement.hidden) {
            alert("Close current edit process to switch to another.\nUse \"Close Edit\" button for closing.");
          }
          else alert("This edit process has already opened.");
        }
      });
    }
  }

  closeEdit(baseInstance) {

    this.allGalleryInstances.forEach(obj => {
      if(obj.id == baseInstance.id) {

        if(obj.title.localeCompare(this.titleCopy) != 0 || 
            obj.description.localeCompare(this.descriptionCopy) != 0) 
            {
              let answer = confirm("Do you want to save changes?");
              if(answer) this.saveChanges(baseInstance);
            } 
        }
    });

    let showEditFieldsArr = this.showEditFields.toArray();

    showEditFieldsArr.forEach(iElem => {
      if(iElem.nativeElement.id == baseInstance.id)  {
        iElem.nativeElement.hidden = true;
      }
    })
    
    this.editProcess = false;
  }

  saveChanges(baseInstance) {

    let dateObj = new Date();
    const today: string = dateObj.getFullYear() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getUTCDate();

    this.allGalleryInstances.forEach(obj => {
      if(obj.id === baseInstance.id) {
        obj.title = this.titleCopy;
        obj.description = this.descriptionCopy;
        obj.datePublished = today;
      }
    });

  }

}
