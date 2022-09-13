# Gilded Rose

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We
have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
Leeroy, who has moved on to new adventures.

Your task is to add the new feature to our system so that
we can begin selling a new category of items.

First an introduction to our system:

* All items have a SellIn value which denotes the number of days we have to sell the item
* All items have a Quality value which denotes how valuable the item is
* At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:


General item requirements:
* quality >= 0

Normal items
* name is anything else
* quality caps out at 50
* normal degrading rules
  * sell-by date:
    * before sell-by date: quality degrades by 1 each day
    * after sell-by date: quality degrades by 2 each day

Conjured items
* name starts with 'Conjured'
* quality caps out at 50
* degrading rules
  * sell-by date:
    * before sell-by date: quality degrades by 2 each day
    * after sell-by date: quality degrades by 4 each day

Quality increasing items
* quality caps out at 50
* backstage passes
  * name starts with "Backstage passes"
  * Days left:
    * 10-: Quality increases by 2
    * 5-: quality increases by 3
  * Quality drops to 0 after the concert (concert date == sell-by date)
* fine cheeses
  * name is one of ['Aged Brie']
  * quality increases by 1 each day

Legendary items
* name is one of ['Sulfuras, Hand of Ragnaros']
* quality is static
  * don't degrade in quality
  * no quality cap
* no sell-by date (doesn't have to be sold)


We have recently signed a supplier of conjured items. This requires an update to our system:

	- "Conjured" items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
still works correctly. However, do not alter the Item class or Items property as those belong to the
goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters.

---


## Getting started

Install dependencies

```sh
npm install
```

## Running app
_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

## Running tests

To run all tests

### Jest way

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```
