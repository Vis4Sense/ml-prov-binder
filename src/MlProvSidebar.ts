import { Widget } from '@lumino/widgets';
import { Message } from '@lumino/messaging';
import { D3BarChart } from './D3BarChart';
import { offlineBoltIcon } from '@jupyterlab/ui-components';

const TITLE = 'ML Prov';
const DESCRIPTION = 'HyperParameters:';
const values = '<li>h1 = 20</li><li>h2 = 10</li>';
const hpInput =
  '<input size="15"> &nbsp; <button style="border-radius: 15px;">Add HP</button>';
const description2 = 'Performance Metrics:';
const fScore = '<li>f-score: 0.672</li>';
const metric =
  '<input size="15"> &nbsp; <button style="border-radius: 15px;">Add Metric</button>';

/**
 * Sidebar widget to interact with the extension.
 * See https://github.com/jupyterlab/extension-examples/tree/master/widgets
 */
export class MlProvSidebar extends Widget {
  /**
   * Returns a new table of contents.
   *
   * @param options - options
   * @returns widget
   */
  constructor() {
    super();
    this.addClass('ml-prov-widget-view');
    this.id = 'ml-prov-widget';
    this.title.label = TITLE;
    this.title.caption = DESCRIPTION;
    this.title.icon = offlineBoltIcon; //placeholder, see https://github.com/jupyterlab/jupyterlab/tree/master/packages/ui-components for how to add icons
    this.title.closable = true;

    this.addStaticDummyContent();
  }

  addStaticDummyContent() {
    this.node.insertAdjacentHTML(
      'afterbegin',
      `
      <h1>${TITLE}</h1>
      <p>${DESCRIPTION}</p>
      <ul>${values}</ul>
      ${hpInput}
      <div style="margin-bottom: 0.5cm;"></div>
      <p>${description2}</p>
      <ul>${fScore}</ul>
      ${metric}
      <div style="margin-bottom: 1cm;"></div>
    `
    );
  }

  protected onBeforeShow(msg: Message) {
    console.debug(`Opening ${TITLE} sidebar.`);

    //add new chart, different random data on every open
    new D3BarChart(
      [
        { amount: Math.random() * 200 },
        { amount: Math.random() * 200 },
        { amount: Math.random() * 200 }
      ],
      this.node
    );
  }

  protected onAfterHide(msg: Message) {
    console.debug(`closing ${TITLE} sidebar`);
    this.node.querySelector('svg.chart')?.remove();
    this.node.querySelector('svg.chart1')?.remove();
  }
}
