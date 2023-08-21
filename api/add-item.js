import { Client } from "@notionhq/client"
import { input } from '@inquirer/prompts';
import select, { Separator } from '@inquirer/select';

const notion = new Client({ auth: process.env.NOTION_KEY })
const database_map = [
  {
    value: '4d453679bd1b4b6f9f316e46a17538ff',
    name: 'Notes'
  },
  {
    value: '93b229cbc6674f0f80df75d710c874c9',
    name: 'Knowledge'
  }
]

async function addNoteToDB (note, databaseId, opts) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title:
          {
            "text": {
              "content": note.title
            }
          }

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

async function addItem() {
  const chosenDB = await select({ message: 'Select the db you wish to add to', choices: database_map })
  const title = await input({ message: 'Enter your title' })
  const content = await input({ message: 'Enter your content' })
  // console.log(`chosen db ${chosenDB}, title: ${title}, content: ${content}`)

  addNoteToDB(
   {
     title: title,
     content: content
   },
   chosenDB,
   { debug: true }
  )
}

await addItem()
