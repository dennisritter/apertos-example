/**
 * @author Dennis ritter
 * @description Register services and constants in the injector.
 */

// import vue-inject
import injector from 'vue-inject';
// Import glue-config.js
import glueConf from '../../../glue-config';

// if (process.env.environment === 'testing') {
//   injector.service('DatasetService', ['baseUrl'], './../../test/mockdata/datasetServiceMock');
// } else {
//   injector.service('DatasetService', ['baseUrl'], glueConf.services.datasetService);
// }
injector.constant('baseUrl', glueConf.api.baseUrl);
injector.service('DatasetService', ['baseUrl'], glueConf.services.datasetService);
injector.service('DistributionService', ['baseUrl'], glueConf.services.distributionService);
if (glueConf.services.datastoreService) injector.service('DatastoreService', ['baseUrl'], glueConf.services.datastoreService);
