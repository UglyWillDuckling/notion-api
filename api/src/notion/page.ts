import { NotionPage } from './notion_page'

export class Page {
  db: string
  title: any
  children: any
  icon: any
  labels: any

  constructor(db: string, title: any, children: any, icon: any, labels: any) {
    this.db = db
    this.title = title
    this.children = children
    this.icon = icon
    this.labels = labels
  }

  toNotionPage(): NotionPage {
    let properties = {
      title: { title: [{ "text": { "content": this.title } }] },
      Labels: { multi_select: this.labels }
    }

    return new NotionPage({ database_id: this.db }, this.title, this.children, this.icon, this.labels)

    return {
      parent: { database_id: this.db },
      properties,
      children: this.children,
      icon: this.icon ? { "type": "emoji", "emoji": this.icon } : null
    }
  }
}

