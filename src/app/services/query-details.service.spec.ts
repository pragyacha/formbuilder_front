import { TestBed } from '@angular/core/testing';

import { QueryDetailsService } from './query-details.service';

describe('QueryDetailsService', () => {
  let service: QueryDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
