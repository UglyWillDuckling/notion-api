import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = '4d453679bd1b4b6f9f316e46a17538ff'

async function getCourses() {
  const { results: page } = await notion.databases.query({
    database_id: databaseId,
  })

  return page
}

const newPage = await getCourses()
console.log(newPage)

