import { input } from '@inquirer/prompts'
import autocomplete from 'inquirer-autocomplete-standalone';
import * as emoji from 'node-emoji'

export class IconQ {
  #value = '';

  static from(item) {
    return new Title(item.title, item.content, item.icon, item.labels)
  }

  static fromList(items) {
    return items.map((item) => Title.from(item))
  }

  async ask() {
    const answer = await autocomplete({
      message: 'Choose your icon',
      source: (input) => {
        input = input ? input : ''
        const emojis = emoji.search(input) // [ { emoji: '🦄', name: 'unicorn' }, ... ]

        return emojis.map(country => {
          return {
            value: country.emoji,
            description: country.key
          }
        })
      }
    })

    this.#value = answer
    return this
  }

  toNotionValue() {
    return this.#value
  }
}

