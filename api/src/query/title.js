import { input } from '@inquirer/prompts'

export class Title {
  #value = ''

  async ask() {
    this.#value = await input({ message: 'Enter your title' })
    return this
  }

  toNotionValue() {
    return this.#value
  }
}

