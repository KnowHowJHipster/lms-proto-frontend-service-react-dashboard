import { cleanEntity, mapIdList } from './entity-utils';

describe('Entity utils', () => {
  describe('cleanEntity', () => {
    it('should not remove fields with an id', () => {
      const entityA = {
        a: {
          id: 5,
        },
      };
      const entityB = {
        a: {
          id: '5',
        },
      };

      expect(cleanEntity({ ...entityA })).eq(entityA);
      expect(cleanEntity({ ...entityB })).eq(entityB);
    });

    it('should remove fields with an empty id', () => {
      const entity = {
        a: {
          id: '',
        },
      };

      expect(cleanEntity({ ...entity })).eq({});
    });

    it('should not remove fields that are not objects', () => {
      const entity = {
        a: '',
        b: 5,
        c: [],
        d: '5',
      };

      expect(cleanEntity({ ...entity })).eq(entity);
    });
  });

  describe('mapIdList', () => {
    it("should map ids no matter the element's type", () => {
      const ids = ['jhipster', '', 1, { key: 'value' }];

      expect(mapIdList(ids)).eq([
        { id: 'jhipster' },
        { id: 1 },
        { id: { key: 'value' } },
      ]);
    });

    it('should return an empty array', () => {
      const ids = [];

      expect(mapIdList(ids)).eq([]);
    });
  });
});
