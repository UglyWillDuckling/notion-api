export class NotionPage {
  parent: object
  title: any
  children: any
  icon: any
  labels: any

  constructor(parent: object, title: any, children: any, icon: any, labels: any) {
    this.parent = parent
    this.title = title
    this.children = children
    this.icon = icon
    this.labels = labels
  }
}

