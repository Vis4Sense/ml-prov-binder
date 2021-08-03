import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { requestAPI } from './handler';
import { MlProvSidebar } from './MlProvSidebar';

async function activateMLProv(app: JupyterFrontEnd) {
  console.log('JupyterLab extension ml-prov is activated!');

  // get data from server-side python
  requestAPI<any>('get_example')
    .then(data => {
      console.log(data);
    })
    .catch(reason => {
      console.error(
        `The ml_prov server extension appears to be missing.\n${reason}`
      );
    });

  // create sidebar widget
  const provWidget = new MlProvSidebar();
  app.shell.add(provWidget, 'left');
}

/**
 * Initialization data for the ml-prov extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'ml-prov:plugin',
  autoStart: true,
  activate: activateMLProv
};

export default plugin;
