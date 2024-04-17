import { TestBed } from '@angular/core/testing';

import { DBservicesService } from './dbservices.service';

describe('DBservicesService', () => {
  let service: DBservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
