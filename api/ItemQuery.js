import { input } from '@inquirer/prompts';
import editor from '@inquirer/editor';
import { Item } from './Item.js';

export class ItemQuery {
  async ask() {
    const title = await input({ message: 'Enter your title' });
    let icon = await input({ message: 'Enter ICON' });
    const content = await editor({ message: 'Enter your content', postfix: '.md' });
    const labels = await input({ message: 'Enter labels separated by a comma(,)', postfix: '.md' })
      .then((text) => text.split(',').filter((value) => !!value).map((value) => { return { name: value }; }));

    return new Item(title, content, icon, labels);
  }
}

