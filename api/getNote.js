import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function getCourses()  {
  try {
    const { results } = await notion.databases.query({
      database_id: databaseId,
    });
    const page = results[0]

    return page
  } catch (error) {
    console.error(error)
  }
}

getCourses().then((something) => console.log(something))
