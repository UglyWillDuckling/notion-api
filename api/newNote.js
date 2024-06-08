#!/usr/bin/env node

import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import editor from '@inquirer/editor';
import { RepeatWithQuery } from './RepeatWithQuery.js';
import { database_map } from "./notion.js";
import { addItemToDB } from './addItemToDB.js';

const debug = true;

class Item {
  constructor(title, content, icon, labels) {
    this.title = title
    this.content = content
    this.icon = icon
    this.labels = labels
  }
}

class ItemQuery {
  async ask() {
    const title = await input({ message: 'Enter your title' })
    let icon = await input({ message: 'Enter ICON' })
    const content = await editor({ message: 'Enter your content', postfix: '.md' })
    const labels = await input({ message: 'Enter labels separated by a comma(,)', postfix: '.md' })
      .then((text) => text.split(',').filter((value) => !!value).map((value) => { return { name: value } }))

    return new Item(title, content, icon, labels)
  }
}

async function addItem() {
  const chosenDB = await select({ message: 'Select the db you wish to add to', choices: database_map })
  // TODO: split the code here into multiple functions depending on the chosenDB
  // TODO: see what happens to the addItemToDB function call when there are multiple functions to create the different DB items
  // TODO: define the different DB items as entity classes
  // WARN: we will need to add a trasnform function to each entity class, so that we can convert the data coming from the DB into a format that we can use
  const response = await addItemToDB(await new ItemQuery().ask(), chosenDB)

  console.log("New Note Added!!! 🚀\n", response.url);
  if (debug) console.log(response)
}

new RepeatWithQuery(() => addItem()).call()

