import { TestBed } from '@angular/core/testing';


import { GetInstancesDataService } from './get-instances-data.service';

describe('GetInstancesDataService', () => {
  let service: GetInstancesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInstancesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
