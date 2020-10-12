import { TestBed } from '@angular/core/testing';

import { ItemFormFactoryService } from './item-form-factory.service';

describe('ItemFormFactoryService', () => {
  let service: ItemFormFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemFormFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
