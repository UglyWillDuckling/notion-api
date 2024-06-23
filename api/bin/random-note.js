#!/usr/bin / env node

import { database_map } from "../src/notion/notion_client.js";
import { addItemToDB } from '../lib/notion/addItemToDB.js';
import { randomItem } from '../src/misc/randomItem.js';
import select from '@inquirer/select';

const debug = true;

async function addItem() {
  const chosenDB = await select({ message: 'Select the db you wish to add to', choices: database_map })

  const response = await addItemToDB(randomItem(), chosenDB)

  console.log("New Item Added!!! 🚀\n", response.url);
  if (debug) console.log(response)
}

addItem()

