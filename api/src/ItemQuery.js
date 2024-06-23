import { Item } from './Item.js';
import { Title } from './query/title.js';
import { LabelQuery } from './query/label.js';
import { EditorQuery } from './query/editor.js';
import { IconQ } from './query/icon.js';

export class ItemQuery {
  async ask() {
    const title = (await new Title().ask()).toNotionValue()
    let icon = (await new IconQ().ask()).toNotionValue()
    const content = (await new EditorQuery().ask()).toNotionValue()
    const labels = (await new LabelQuery().ask()).toNotionValue()

    return new Item(title, content, icon, labels)
  }
}

