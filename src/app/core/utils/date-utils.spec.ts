import { TestBed } from "@angular/core/testing";
import { DateUtils } from "./date-utils";

describe('DateUtils', () => {
  let utils: DateUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DateUtils,
      ]
    });
    utils = TestBed.inject(DateUtils);
  });

  it('should return empty on empty date iso', () => {
    expect(utils.fromIsoToDMY('')).toBe('');
  });

  it('should return dmy date on correct date iso', () => {
    expect(utils.fromIsoToDMY('2011-02-01')).toBe('01/02/2011');
  });

  it('should return empty on empty date dmy', () => {
    expect(utils.fromDMYToIso('')).toBe('');
  });

  it('should return dmy date on correct date iso', () => {
    expect(utils.fromDMYToIso('01/02/2011')).toBe('2011-02-01');
  });
});