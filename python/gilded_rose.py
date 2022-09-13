# -*- coding: utf-8 -*-

class GildedRose(object):

    def __init__(self, items):
        self.items = items
        self.legendary_items = ["Sulfuras, Hand of Ragnaros"]
        self.increases_over_time_items = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"]

    def update_quality(self):
        for item in self.items:
            name = item.name
            if not self.does_increase_over_time(name):
                if item.quality > 0 and not self.is_legendary(name):
                    item.quality = item.quality - 1
            elif item.quality < 50:
                item.quality = item.quality + 1
                if name == "Backstage passes to a TAFKAL80ETC concert":
                    if item.sell_in < 11 and item.quality < 50:
                        item.quality = item.quality + 1
                    if item.sell_in < 6 and item.quality < 50:
                            item.quality = item.quality + 1
            if not self.is_legendary(name):
                item.sell_in = item.sell_in - 1
            if item.sell_in < 0:
                if name != "Aged Brie":
                    if name != "Backstage passes to a TAFKAL80ETC concert":
                        if item.quality > 0 and not self.is_legendary(name):
                            item.quality = item.quality - 1
                    else:
                        item.quality = item.quality - item.quality
                elif item.quality < 50:
                    item.quality = item.quality + 1

    def is_legendary(self, item_name):
        if item_name in self.legendary_items:
            return True
        else:
            return False

    def does_increase_over_time(self, item_name):
        if item_name in self.increases_over_time_items:
            return True
        else:
            return False


class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)
