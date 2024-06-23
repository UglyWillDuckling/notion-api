import { input } from '@inquirer/prompts';

export class LabelQuery {
  #values = [];

  async ask() {
    const labels = await input({ message: 'Enter labels separated by a comma(,)', postfix: '.md' })

    this.#values = labels.split(',').filter((value) => !!value).map((value) => { return { name: value }; })

    return this
  }

  toNotionValue() {
    // TODO: transform into Notion format
    return this.#values
  }
}

