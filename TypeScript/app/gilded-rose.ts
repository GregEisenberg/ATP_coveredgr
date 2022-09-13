export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BRIE = 'Aged Brie';
const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert'
const CONJURED = 'Conjured';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  incrementQuality(item : Item, quantity: number) {
    item.quality = Math.max(Math.min(50, item.quality + quantity), 0);
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name !== SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }

      let quantityDelta;

      switch (item.name) {
        case BRIE: {
          quantityDelta = item.sellIn > 0 ? 1 : 2;
          break;
        }
        case SULFURAS: {
          break;
        }
        case BACKSTAGE: {
          if (item.sellIn > 10) {
            quantityDelta = 1;
          } else if (item.sellIn > 5) {
            quantityDelta = 2;
          } else if (item.sellIn >= 0) {
            quantityDelta = 3;
          } else {
            item.quality = 0;
          }
          break;
        }
        case CONJURED: {
          quantityDelta = item.sellIn > 0 ? -2 : -4;
          break;
        }
        default: {
          quantityDelta = item.sellIn > 0 ? -1 : -2;
          break;
        }
      }

      if (typeof quantityDelta === 'number') {
        this.incrementQuality(item, quantityDelta);
      }
    }

    return this.items;
  }
}
