import { markdownToBlocks } from '@tryfabric/martian';
import { notion } from "./notion.js";

// generic function responsible for making the call to notion only
// TODO: move this to another file as well
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

