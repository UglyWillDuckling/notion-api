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

async function addItemToDB(note, databaseId, opts = {}, errHandler = () => { }) {
  let properties = {
    title: { title: [{ "text": { "content": note.title } }] },
  }
  if (note.labels.length) {
    properties.Labels = { multi_select: note.labels }
  }

  let page = { parent: { database_id: databaseId }, properties, children: markdownToBlocks(note.content) }

  if (note.icon) {
    page.icon = { "type": "emoji", "emoji": note.icon }
  }

  try {
    const response = await notion.pages.create(page)
    console.log(`Nen Note Added!!! 🚀\nURL: ${response.url}`)
    if (opts.debug) console.log(response)
  } catch (err) {
    console.log(err)
    errHandler(err)
  }
}

async function addItem() {
  const chosenDB = await select({ message: 'Select the db you wish to add to', choices: database_map })
  const title = await input({ message: 'Enter your title' })
  let icon = await input({ message: 'Enter ICON' })
  const content = await editor({ message: 'Enter your content', postfix: '.md' })
  const labels = await input({ message: 'Enter labels separated by a comma(,)', postfix: '.md' })
    .then((text) => text.split(',').filter((value) => !!value).map((value) => { return { name: value } }))

  const note = { title: title, content: content, icon, labels }

  const errHandler = (err) => {
    select({ message: 'Do you want to try again?', choices: [{ value: 1, name: 'Yes' }, { value: 0, name: 'No' }] }).then((answer) => {
      if (answer) send()
      else console.log(err)
    })
  }

  addItemToDB(note, chosenDB, {}, errHandler)
}

// test()
addItem()

