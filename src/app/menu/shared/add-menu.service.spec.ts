import { TestBed, inject } from '@angular/core/testing';

import { AddMenuService } from './add-menu.service';

describe('AddMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddMenuService]
    });
  });

  it('should be created', inject([AddMenuService], (service: AddMenuService) => {
    expect(service).toBeTruthy();
  }));
});
