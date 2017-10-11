/**
 * @author Dennis ritter
 * @description Configuration to tell the Core-Application where to find the services.
 */

import datasetService from './ckan-adapters/src/datasets';
import distributionService from './ckan-adapters/src/distributions';
import datastoreService from './ckan-adapters/src/datastore';

export default {
  api: {
    baseUrl: 'https://www.europeandataportal.eu/data/api/3/action/',
  },
  services: {
    datasetService,
    distributionService,
    datastoreService,
  },
};
