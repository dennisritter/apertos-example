/* eslint-disable no-unused-vars,class-methods-use-this */
/**
 * @author Dennis ritter
 * @created 03.08.17
 * @description.
 */
export default class Datasets {
  getSingle(id) {
    return new Promise((resolve, reject) => {
      const resData = {
        categories: [],
        description: 'nice description for a dataset',
        distributions: [
          {
            accessUrl: 'www.mock.com',
            format: 'nice-format',
            description: 'nice description for dist1',
            id: 'dist1',
            modificationDate: '2010-01-01T00:00:00-0800',
            releaseDate: '2000-01-01T00:00:00-0800',
            title: 'Distribution 1',
            url: 'www.mock.com',
            urlType: 'no type',
          },
          {
            accessUrl: 'www.mock.com',
            format: 'format-x',
            description: 'nice description for dist2',
            id: 'dist2',
            modificationDate: '2010-01-01T00:00:00-0800',
            releaseDate: '2000-01-01T00:00:00-0800',
            title: 'Distribution 2',
            url: 'www.mock.com',
            urlType: 'no type',
          },
        ],
        distributionFormats: ['nice-format', 'format-x'],
        id: 'ds1',
        idName: 'ds1',
        licence: 'best licence',
        modificationDate: '2010-01-01T00:00:00-0800',
        publisher: 'Peter Petersen',
        releaseDate: '2000-01-01T00:00:00-0800',
        tags: ['awesome', 'mockdata'],
        title: 'Dataset 1',
      };
      resolve(resData);
    });
  }

  get(query, facets, limit, offset) {
    return new Promise((resolve) => {
      const resData = {
        availableFacets: [
          {
            title: 'testField1',
            items: ['t1Facet1', 't1Facet2', 't1Facet3'],
          },
          {
            title: 'testField2',
            items: ['t2Facet1', 't2Facet2', 't2Facet3'],
          },
        ],
        datasetsCount: 1,
        datasets: [
          {
            categories: [],
            description: 'nice description for a dataset',
            distributions: [
              {
                accessUrl: 'www.mock.com',
                format: 'nice-format',
                description: 'nice description for dist1',
                id: 'dist1',
                modificationDate: '2010-01-01T00:00:00-0800',
                releaseDate: '2000-01-01T00:00:00-0800',
                title: 'Distribution 1',
                url: 'www.mock.com',
                urlType: 'no type',
              },
              {
                accessUrl: 'www.mock.com',
                format: 'format-x',
                description: 'nice description for dist2',
                id: 'dist2',
                modificationDate: '2010-01-01T00:00:00-0800',
                releaseDate: '2000-01-01T00:00:00-0800',
                title: 'Distribution 2',
                url: 'www.mock.com',
                urlType: 'no type',
              },
            ],
            distributionFormats: ['nice-format', 'format-x'],
            id: 'ds1',
            idName: 'ds1',
            licence: 'best licence',
            modificationDate: '2010-01-01T00:00:00-0800',
            publisher: 'Peter Petersen',
            releaseDate: '2000-01-01T00:00:00-0800',
            tags: ['awesome', 'mockdata'],
            title: 'Dataset 1',
          },
        ],
      };
      resolve(resData);
    });
  }
}
