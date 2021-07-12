import { requestAPI } from './handler';
/**
 * Initialization data for the ml-prov extension.
 */
const plugin = {
    id: 'ml-prov:plugin',
    autoStart: true,
    activate: (app) => {
        console.log('JupyterLab extension ml-prov is activated!');
        requestAPI('get_example')
            .then(data => {
            console.log(data);
        })
            .catch(reason => {
            console.error(`The ml_prov server extension appears to be missing.\n${reason}`);
        });
    }
};
export default plugin;
