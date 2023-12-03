#!/usr/bin/env node

import { Client } from "@notionhq/client"
import { input } from '@inquirer/prompts';
import select, { Separator } from '@inquirer/select';
import editor from '@inquirer/editor';
import { markdownToBlocks } from '@tryfabric/martian';

const notion = new Client({ auth: process.env.NOTION_KEY })
const database_map = [{
  value: '4d453679bd1b4b6f9f316e46a17538ff',
  name: 'Notes'
},
  {
    value: '93b229cbc6674f0f80df75d710c874c9',
    name: 'Knowledge'
  }
]

async function addNoteToDB (note, databaseId, opts = {}, errHandler = () => {}) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      icon: { "type": "emoji", "emoji": note.icon || "🗒" },
      properties: {
          Labels: {
            multi_select: note.labels,
          },
          title: { title:[ { "text": { "content": note.title } } ]
        },
      },
      "children": markdownToBlocks(note.content)
    })

    console.log(`New Note Added!!! 🚀\nURL: ${response.url}`)
    if(opts.debug) console.log(response)
  } catch (error) {
    errHandler(error)
  }
}

async function addItem() {
  function send () {  addNoteToDB(note, chosenDB, {}, errHandler) }

  const chosenDB = await select({ message: 'Select the db you wish to add to', choices: database_map })
  const title = await input({ message: 'Enter your title' })
  const icon = await input({ message: 'Enter ICON' })
  const content = await editor({ message: 'Enter your content', postfix: '.md' })
  const labels = await input({ message: 'Enter labels separated by a comma(,)', postfix: '.md' }).then((text) => text.split(',').map((value) => { return {name: value} }))

  const note = { title: title, content: content, icon, labels }

  const errHandler = (err) => {
    select({ message: 'Do you want to try again?', choices: [{value: 1, name: 'Yes'}, {value: 0, name: 'No'}] }).then((answer) => {
      if(answer) send()
      else console.log(err)
    })
  }

  send()
}

addItem()

