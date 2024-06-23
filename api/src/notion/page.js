export class Page {
  constructor(db, title, children, icon, labels) {
    this.db = db
    this.title = title
    this.children = children
    this.icon = icon
    this.labels = labels
  }

  toNotionPage() {
    let properties = {
      title: { title: [{ "text": { "content": this.title } }] },
      Labels: { multi_select: this.labels }
    }

    return {
      parent: { database_id: this.database },
      properties,
      children: this.children,
      icon: this.icon ? { "type": "emoji", "emoji": this.icon } : null
    }
  }
}

