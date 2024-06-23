#!/usr/bin / env node

import { notion } from "./notion.js";

const r = await notion.users.list()

console.log(r)

