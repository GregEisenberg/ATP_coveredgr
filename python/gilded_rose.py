# -*- coding: utf-8 -*-

class GildedRose(object):

    def __init__(self, items):
        self.items = items

    # 3 ways an item can mutate quality:
    # 1. It degrades with a floor of 0
    # 2. It upgrades with a ceiling of 50
    # 3. It goes immediately to 0

    # 3 phases? Make the degrade and upgrade functions smarter to handle different cases
    # 1. Decrease sell-in

    def degrade_quality(self, item):
        degradation_rate = 1
        if self.is_item_expired(item):
            degradation_rate = 2
        if self.is_item_conjured(item):
            degradation_rate *= 2
        item.quality = max(0, item.quality - degradation_rate)

    def upgrade_quality(self, item):
        upgrade_rate = 1
        if item.name == "Backstage passes to a TAFKAL80ETC concert":
            if item.sell_in <= 10:
                upgrade_rate = 2
            if item.sell_in <= 5:
                upgrade_rate = 3
        if self.is_item_better_after_expiration(item) and self.is_item_expired(item):
            upgrade_rate = 2
        item.quality = min(50, item.quality + upgrade_rate)

    def render_useless(self, item):
        item.quality = 0

    def is_item_conjured(self, item):
        return item.name.startswith('Conjured')

    def is_item_legendary(self, item):
        return item.name == "Sulfuras, Hand of Ragnaros"

    def is_item_degradable(self, item):
        return (
            item.name != "Aged Brie" and
            item.name != "Backstage passes to a TAFKAL80ETC concert" and
            item.name != "Sulfuras, Hand of Ragnaros"
        )

    def is_item_upgradable(self, item):
        return (
            item.name == "Aged Brie" or
            item.name == "Backstage passes to a TAFKAL80ETC concert"
        )

    def is_item_expired(self, item):
        return item.sell_in <= 0

    def is_item_useless_after_expiration(self, item):
        return item.name == "Backstage passes to a TAFKAL80ETC concert"

    def is_item_better_after_expiration(self, item):
        return item.name == "Aged Brie"

    def update_quality(self):
        for item in self.items:
            if self.is_item_degradable(item):
                self.degrade_quality(item)
            elif self.is_item_upgradable(item):
                self.upgrade_quality(item)
            if self.is_item_expired(item) and self.is_item_useless_after_expiration(item):
                self.render_useless(item)
            if not self.is_item_legendary(item):
                item.sell_in = item.sell_in - 1


class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)
