e

import chalk from 'chalk'
import rl  from 'readline'
import { createSelect } from './select.js'
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })
const database_map = {
  0: {
    id: '4d453679bd1b4b6f9f316e46a17538ff',
    title: 'Notes'
  },
  1: {
    id: '93b229cbc6674f0f80df75d710c874c9',
    title: 'Knowledge'
  }
}

function prompt(question, opts) {
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  return new Promise((resolve) => {
    if(opts) {
      const select = createSelect(opts, resolve)
      select.init()
    } else {
      r.question(question, answer => {
        r.close()
        resolve(answer)
      })
    }
  })
}

async function addNoteToDB (note, databaseId, opts) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": note.title
              }
            }
          ]
        },
      },
      "children": [
        {
          "object": "block",
          "type": "paragraph",
          "paragraph": {
            "rich_text": [{ "type": "text", "text": { "content": note.content } }]
          }
        }
      ]
    })

    if(opts.debug) {
      console.log(response)
    }
    console.log(`New Note Added!!! 🚀\nURL: ${response.url}`)
  } catch (error) {
    console.error(error)
  }
}

function addItem() {
  let title = ''
  let content = ''
  let chosenDB = ''

  const q = 'Select the database: '
  prompt(q, database_map).then(opt => {
    chosenDB = opt
  }).then(() => {
    const q = chalk.blue('Enter Title: ')
    return prompt(q)
  }).then((text) => {
    title = text
    const q = chalk.blue('Enter Content\n')
    return prompt(q)
  }).then((text) => {
    content = text

    addNoteToDB({
      title: title,
      content: content,
    }, chosenDB.id, { debug: true })
  })
}

addItem()
