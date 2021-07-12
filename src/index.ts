import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the ml-prov extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'ml-prov:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension ml-prov is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The ml_prov server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
