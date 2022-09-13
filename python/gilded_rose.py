# -*- coding: utf-8 -*-

class GildedRose(object):

    def __init__(self, items):
        self.items = items
        self.legendary_items = ["Sulfuras, Hand of Ragnaros"]
        self.increases_over_time_items = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"]

    def update_quality(self):
        for item in self.items:
            name = item.name
            if self.does_increase_over_time(name) and item.quality <= 50:
                if name == "Aged Brie":
                    item.increase_brie_quality()
                if name == "Backstage passes to a TAFKAL80ETC concert":
                    item.increase_backstage_pass_quality()
            elif item.quality > 0 and not self.is_legendary(name):
                if item.conjured:
                item.quality = item.quality - 1
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

    def increase_backstage_pass_quality(self):
        if self.sell_in <= 5:
            self.quality += 3
        elif self.sell_in <= 10:
            self.quality += 2
        else:
            self.quality += 1
        if self.quality > 50:
            self.quality = 50

    def increase_brie_quality(self):
        self.quality += 1
        if self.quality > 50:
            self.quality = 50
