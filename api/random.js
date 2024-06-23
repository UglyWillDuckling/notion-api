#!/usr/bin / env node

import { database_map } from "./notion.js";
import { addItemToDB } from './addItemToDB.js';
import { randomItem } from './randomItem.js';
import select from '@inquirer/select';

const debug = true;

async function addItem() {
  const chosenDB = await select({ message: 'Select the db you wish to add to', choices: database_map })

  const response = await addItemToDB(randomItem(), chosenDB)

  console.log("New Item Added!!! 🚀\n", response.url);
  if (debug) console.log(response)
}

addItem()

