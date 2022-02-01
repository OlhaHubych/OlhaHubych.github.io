import { TestBed } from '@angular/core/testing';

import { DeleteInstanceService } from './delete-instance.service';

describe('DeleteInstanceService', () => {
  let service: DeleteInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
