import { Item, GildedRose } from '@/gilded-rose';

const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BRIE = 'Aged Brie';
const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert'
const CONJURED = 'Conjured';
const GENERIC = 'Generic item';

describe("Gilded Rose", function () {
  it("Legendary Item quality does not decrease", () => {
    // Arrange
    const sut = new GildedRose([new Item(SULFURAS, 20, 80)]);

    // Act
    const items = sut.updateQuality();

    // Assert
    expect(items[0].quality).toBe(80);
  });

  it("Legendary Item never has to be sold", () => {
    const sut = new GildedRose([new Item(SULFURAS, 1, 80)]);

    const items = sut.updateQuality();

    expect(items[0].sellIn).toBe(1);
  });

  it("Legendary Item quality does not change after sellin", () => {
    const sut = new GildedRose([new Item(SULFURAS, -1, 80)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(80);
  });


  it("Generic item SellIn decreases each update", () => {
    const sut = new GildedRose([new Item(GENERIC, 8, 8)]);

    const items = sut.updateQuality();

    expect(items[0].sellIn).toBe(7);
  });

  // TODO - can the tests for `negative after sellIn date reached` be parameterized for several items??
  it.each([
    {
      name: CONJURED,
    },
    {
      name: GENERIC
    }
  ])("$name SellIn will be negative after sellIn date reached", ({ name }) => {
    const sut = new GildedRose([new Item(name, 0, 10)]);

    const items = sut.updateQuality();

    expect(items[0].sellIn).toBe(-1);
  });

  it("Generic item quality decreases by 1 before sellIn date reached", () => {
    const sut = new GildedRose([new Item(GENERIC, 5, 10)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(9);
  });

  it("Generic item quality decreases twice as fast after sellIn date reached", () => {
    const sut = new GildedRose([new Item(GENERIC, 0, 10)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(8);
  });

  it.each([
    {
      name: CONJURED,
    },
    {
      name: GENERIC
    }
  ])("$name quality never decreases below 0", ({ name }) => {
    const sut = new GildedRose([new Item(name, 5, 0)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  it("Aged Brie item SellIn decreases each update", () => {
    const sut = new GildedRose([new Item(BRIE, 5, 5)]);

    const items = sut.updateQuality();

    expect(items[0].sellIn).toBe(4);
  });

  it("Aged Brie SellIn will be negative after sellIn date reached", () => {
    const sut = new GildedRose([new Item(BRIE, 0, 25)]);

    const items = sut.updateQuality();

    expect(items[0].sellIn).toBe(-1);
  });

  it("Aged Brie quality improves with age", () => {
    const sut = new GildedRose([new Item(BRIE, 5, 30)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(31);
  });

  it("Aged Brie quality improves twice as fast after sellIn date reached", () => {
    const sut = new GildedRose([new Item(BRIE, 0, 30)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(32);
  });

  // TODO: can all items which improve with and have cap be tested together?
  it("Aged Brie improves with age, quality is capped at 50 before sellIn date reached", () => {
    const sut = new GildedRose([new Item(BRIE, 10, 50)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it("Aged Brie quality capped at 50 even when really old", () => {
    const sut = new GildedRose([new Item(BRIE, -10, 50)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(50);
  });


  // TODO - there are several items whose Sellin decreases each update.. can we make it dat driven?
  it("Backstage passes SellIn decreases each update", () => {
    const sut = new GildedRose([new Item(BACKSTAGE, 10, 10)]);

    const items = sut.updateQuality();

    expect(items[0].sellIn).toBe(9);
  });

  it("Backstage passes SellIn will be negative after sellIn date reached", () => {
    const sut = new GildedRose([new Item(BACKSTAGE, 0, 25)]);

    const items = sut.updateQuality();

    expect(items[0].sellIn).toBe(-1);
  });

  it("Backstage pass quality increases when concert is far in the future", () => {
    const sut = new GildedRose([new Item(BACKSTAGE, 30, 23)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(24);
  });

  it("Backstage pass quality increases more when concert is 10 days away", () => {
    const sut = new GildedRose([new Item(BACKSTAGE, 10, 23)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(25);
  });

  it("Backstage pass quality increases even more when concert is 5 days away", () => {
    const sut = new GildedRose([new Item(BACKSTAGE, 5, 23)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(26);
  });


  it("Backstage passes improves with age, quality is capped at 50", () => {
    const sut = new GildedRose([new Item(BACKSTAGE, 10, 50)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it("Backstage pass quality drops to zero when concert has passed", () => {
    const sut = new GildedRose([new Item(BACKSTAGE, 0, 23)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  it("Backstage pass quality is capped at 50 when concert is about to happen", () => {
    const sut = new GildedRose([new Item(BACKSTAGE, 1, 49)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it("Shop can contain multiple items and each is updated", () => {
    const sut = new GildedRose([new Item(SULFURAS, 0, 80),
    new Item(GENERIC, 10, 5)]);

    const items = sut.updateQuality();

    // jest doesn't have a mechanism to ensure all expectations are verified
    // Is there any other way to do this?
    expect(items[0].sellIn).toBe(0);
    expect(items[1].sellIn).toBe(9);
  });

  it("Conjured item quality decreases by 2 before sellIn date reached", () => {
    const sut = new GildedRose([new Item(CONJURED, 5, 10)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(8);
  });

  it("Conjured item quality decreases twice as fast after sellIn date reached", () => {
    const sut = new GildedRose([new Item(CONJURED, 0, 10)]);

    const items = sut.updateQuality();

    expect(items[0].quality).toBe(6);
  });

});
