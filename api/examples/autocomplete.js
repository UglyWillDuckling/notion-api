
import * as emoji from 'node-emoji'
import autocomplete from 'inquirer-autocomplete-standalone';

const answer = await autocomplete({
  message: 'Which emoji?',
  source: (input) => {
    input = input ? input : ''
    // input is a string
    const emojis = emoji.search(input) // [ { emoji: '🦄', name: 'unicorn' }, ... ]

    return emojis.map(country => {
      return {
        value: country.emoji,
        description: country.key
      }
    })
  }
})

console.log(answer) // Norway

