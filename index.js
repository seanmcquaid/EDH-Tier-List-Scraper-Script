const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://tappedout.net/mtg-decks/best-commanders-in-edh-tier-list/';

const searchedString = 'Golos, Tireless Pilgrim';
const formattedString = searchedString
  .toLowerCase()
  .replace(/,/g, '')
  .replace(/\s/g, '-');

const getTierNumber = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const lists = $('.boardlist');
    for (let i = 0; i < lists.length; i++) {
      const baseSelector = 'boardContainer-main-';
      const fullId = `${baseSelector}${formattedString}`;
      const children = lists[i]?.children;
      for (let j = 0; j < children.length; j++) {
        if (fullId === children[j]?.next?.attribs?.id) {
          return `Tier ${i}`;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  return 'Tier not found';
};

getTierNumber().then((resp) => console.log(resp));
