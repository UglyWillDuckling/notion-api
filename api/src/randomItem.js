import { Item } from './Item.js';

export function randomItem() {
  const title = 'title'
  let icon = '🎁'
  const content = 'content'
  const labels = []

  return new Item(title, content, icon, labels);
}

