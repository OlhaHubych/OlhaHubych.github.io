import { TestBed } from '@angular/core/testing';

import { InstancesFilterService } from './instances-filter.service';

describe('InstancesFilterService', () => {
  let service: InstancesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstancesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
