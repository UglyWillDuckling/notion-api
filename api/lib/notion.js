import { Client } from "@notionhq/client";

// TODO: move this to another file
export const notion = new Client({ auth: process.env.NOTION_KEY });
export const database_map = [{
  value: '4d453679bd1b4b6f9f316e46a17538ff',
  name: 'Notes'
},
{
  value: '93b229cbc6674f0f80df75d710c874c9',
  name: 'Knowledge'
}
];

