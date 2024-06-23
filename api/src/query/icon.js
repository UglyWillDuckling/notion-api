import { input } from '@inquirer/prompts'

export class IconQ {
  #value = '';

  static from(item) {
    return new Title(item.title, item.content, item.icon, item.labels)
  }

  static fromList(items) {
    return items.map((item) => Title.from(item))
  }

  async ask() {
    this.#value = await input({ message: 'Enter ICON' });
    return this
  }

  toNotionValue() {
    return this.#value
  }
}

