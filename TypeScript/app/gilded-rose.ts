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

enum ItemType {
  Normal,
  // Conjured,
  BackstagePasses,
  FineCheeses,
  Legendaries,
}
class ItemCategory {
  item: Item;
  type: ItemType;

  constructor(item: Item) {
    this.item = item;
    this.type = ItemCategory.getItemType(item);
  }

  static CHEESES = ['aged brie']
  static LEGENDARIES = ['sulfuras, hand of ragnaros']

  static getItemType(item: Item): ItemType {
    // if item starts with Conjured
    if (item.name.toLowerCase().startsWith('backstage passes')){
      return ItemType.BackstagePasses;
    }

    // if item name is a fine cheese
    if (this.CHEESES.includes(item.name.toLowerCase())){
      return ItemType.FineCheeses;
    }

    if (this.LEGENDARIES.includes(item.name.toLowerCase())){
      return ItemType.Legendaries;
    }
    return ItemType.Normal;
  }

  updateQuality() {
    switch(this.type) {
      case ItemType.BackstagePasses:
        return this.updateBackstageQuality();
      case ItemType.Normal:
        return this.updateNormalQuality();
      case ItemType.FineCheeses:
        return this.updateCheeseQuality();
      case ItemType.Legendaries:
        return this.updateLegendaryQuality();
    }
  }

  updateNormalQuality() {
    const quality = this.item.quality;
    if (this.item.sellIn > 0) {
      this.item.quality = Math.max(quality - 1, 0);
    } else {
      this.item.quality = Math.max(quality - 2, 0);
    }

    this.item.sellIn -= 1;
  }

  updateCheeseQuality() {
    const quality = this.item.quality;
    this.item.quality = Math.min(quality + 1, 50);
  }

  updateBackstageQuality() {
    const quality = this.item.quality;
    if(this.item.sellIn <= 0) {
      this.item.quality = 0;  
    }
    else if (this.item.sellIn < 11) {
      this.item.quality = Math.min(quality + 2, 50);
    } else if (this.item.sellIn < 6) {
      this.item.quality = Math.min(quality + 3, 50);
    } else {
      this.item.quality = Math.min(quality + 1, 50);
    }

    this.item.sellIn -= 1;
  }

  updateLegendaryQuality() {}
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const category = new ItemCategory(this.items[i]);
      category.updateQuality();

      // if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      //   if (this.items[i].quality > 0) {
      //     if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //       this.items[i].quality = this.items[i].quality - 1
      //     }
      //   }
      // } else {
      //   if (this.items[i].quality < 50) {
      //     this.items[i].quality = this.items[i].quality + 1
      //     if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (this.items[i].sellIn < 11) {
      //         if (this.items[i].quality < 50) {
      //           this.items[i].quality = this.items[i].quality + 1
      //         }
      //       }
      //       if (this.items[i].sellIn < 6) {
      //         if (this.items[i].quality < 50) {
      //           this.items[i].quality = this.items[i].quality + 1
      //         }
      //       }
      //     }
      //   }
      // }
      // if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //   this.items[i].sellIn = this.items[i].sellIn - 1;
      // }
      // if (this.items[i].sellIn < 0) {
      //   if (this.items[i].name != 'Aged Brie') {
      //     if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (this.items[i].quality > 0) {
      //         if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //           this.items[i].quality = this.items[i].quality - 1
      //         }
      //       }
      //     } else {
      //       this.items[i].quality = this.items[i].quality - this.items[i].quality
      //     }
      //   } else {
      //     if (this.items[i].quality < 50) {
      //       this.items[i].quality = this.items[i].quality + 1
      //     }
      //   }
      // }
    }

    return this.items;
  }
}
