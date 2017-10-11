import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
// import About from '@/components/About';
import CustomAbout from '@/components/custom/CustomAbout';
import Datasets from '@/components/Datasets';
import CustomDatasetDetails from '@/components/custom/CustomDatasetDetails';
import Impressum from '@/components/Impressum';
import DistributionDetails from '@/components/DistributionDetails';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Datasets',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: CustomAbout,
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: Impressum,
    },
    {
      path: '/datasets',
      name: 'Datasets',
      component: Datasets,
    },
    {
      path: '/datasets/:ds_id',
      name: 'CustomDatasetDetails',
      component: CustomDatasetDetails,
    },
    {
      path: '/datasets/:ds_id/distributions/:dist_id',
      name: 'DistributionDetails',
      component: DistributionDetails,
    },
  ],
});
