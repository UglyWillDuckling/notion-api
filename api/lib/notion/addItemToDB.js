import { markdownToBlocks } from '@tryfabric/martian';
import { notion } from "../../src/notion/notion_client.js";

export async function addItemToDB(item, databaseId) {
  let properties = {
    title: { title: [{ "text": { "content": item.title } }] },
  };
  properties.Labels = { multi_select: item.labels };

  let page = {
    parent: { database_id: databaseId }, properties, children: markdownToBlocks(item.content),
    icon: item.icon ? { "type": "emoji", "emoji": item.icon } : null
  };

  const response = await notion.pages.create(page);

  return response
}

