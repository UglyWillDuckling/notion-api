import { markdownToBlocks } from '@tryfabric/martian';
import editor from '@inquirer/editor';

export class EditorQuery {
  #value = '';

  async ask() {
    this.#value = await editor({ message: 'Enter your content', postfix: '.md' })
    return this
  }

  toNotionValue() {
    return markdownToBlocks(this.#value)
  }
}

