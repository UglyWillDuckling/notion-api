import { Client } from "@notionhq/client"
const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

import chalk from 'chalk'
const q = chalk.blue('Type in your todo\n')

import rl  from 'readline'

function prompt(question) {
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  return new Promise((resolve, error) => {
    r.question(question, answer => {
      r.close()
      resolve(answer)
    })
  })
}

async function addNoteToDB (note, opts) {
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
  const q = chalk.blue('Enter Title: ')
  prompt(q).then(text => {
    title = text
    const q = chalk.blue('Enter Content\n')
    prompt(q).then(text => {
      content = text
      // save to Notion DB
      // console.log(`we have the title: ${title} and the content: ${content}`)
      addNoteToDB({
        title: title,
        content: content
      }, { debug: true })
    })
  })
}

addItem()
