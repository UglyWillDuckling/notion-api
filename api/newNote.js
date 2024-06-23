#!/usr/bin/env node

import select from '@inquirer/select';
import { RepeatWithQuery } from './lib/utils/RepeatWithQuery.js';
import { database_map } from "./lib/notion.js";
import { addItemToDB } from './addItemToDB.js';
import { ItemQuery } from './src/ItemQuery.js';

const debug = true;

async function addItem() {
  const chosenDB = await select({ message: 'Select the db you wish to add to', choices: database_map })
  // TODO: split the code here into multiple functions depending on the chosenDB
  // TODO: see what happens to the addItemToDB function call when there are multiple functions to create the different DB items
  // TODO: define the different DB items as entity classes
  // WARN: we will need to add a transform function to each entity class, so that we can convert the data coming from the DB into a format that we can use

  const response = await addItemToDB(await new ItemQuery().ask(), chosenDB)

  console.log("New Note Added!!! 🚀\n", response.url);
  if (debug) console.log(response)
}

new RepeatWithQuery(() => addItem()).call()

