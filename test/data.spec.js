import { filterNames, filterByTag, difficultyOrder, mediaInfo } from '../src/data.js';


const dataLol = [
  {
    id: "Aatrox",
    name: "Aatrox",
    title: "the Darkin Blade",
    info: {
      attack: 8,
      defense: 4,
      magic: 3,
      difficulty: 4
    },
    tags: ["Fighter", "Tank"],
  },
  {
    id: "Ahri",
    name: "Ahri",
    title: "the Nine-Tailed Fox",
    info: {
      attack: 3,
      defense: 4,
      magic: 8,
      difficulty: 5
    },
    tags: ["Mage", "Assassin"],
  },
  {
    id: "Irelia",
    name: "Irelia",
    title: "the Will of the Blades",
    info: {
      attack: 7,
      defense: 4,
      magic: 5,
      difficulty: 5
    },
    tags: ["Fighter", "Assassin"],
  },
  {
    id: "Vayne",
    name: "Vayne",
    title: "the Night Hunter",
    info: {
      attack: 10,
      defense: 1,
      magic: 1,
      difficulty: 8
    },
    tags: ["Marksman", "Assassin"],
  },
  {
    id: "Zilean",
    name: "Zilean",
    title: "the Chronokeeper",
    info: {
      attack: 2,
      defense: 5,
      magic: 8,
      difficulty: 6
    },
    tags: ["Support", "Mage"],
  }
]

const order = [
{id: 'Aatrox', name: 'Aatrox', title: 'the Darkin Blade', info: { attack: 8, defense: 4, magic: 3, difficulty: 4 }, tags: [ 'Fighter', 'Tank' ]},
{id: 'Ahri', name: 'Ahri', title: 'the Nine-Tailed Fox', info: { attack: 3, defense: 4, magic: 8, difficulty: 5 }, tags: [ 'Mage', 'Assassin' ]},
{id: 'Irelia', name: 'Irelia', title: 'the Will of the Blades', info: { attack: 7, defense: 4, magic: 5, difficulty: 5 }, tags: [ 'Fighter', 'Assassin' ]},
{id: 'Zilean', name: 'Zilean', title: 'the Chronokeeper', info: { attack: 2, defense: 5, magic: 8, difficulty: 6 }, tags: [ 'Support', 'Mage' ]},
{id: 'Vayne', name: 'Vayne', title: 'the Night Hunter', info: { attack: 10, defense: 1, magic: 1, difficulty: 8 }, tags: [ 'Marksman', 'Assassin']}
]

const tagAssassin = [
  {id: "Ahri", name: "Ahri", title: "the Nine-Tailed Fox", info: {attack: 3, defense: 4, magic: 8, difficulty: 5}, tags: ["Mage", "Assassin"]},
  {id: "Irelia", name: "Irelia", title: "the Will of the Blades", info: {attack: 7, defense: 4, magic: 5, difficulty: 5}, tags: ["Fighter", "Assassin"]},
  {id: "Vayne", name: "Vayne", title: "the Night Hunter", info: {attack: 10, defense: 1, magic: 1, difficulty: 8}, tags: ["Marksman", "Assassin"]},
]


describe('filterNames', () => {
  it('filterNames should be a function', () => {
    expect(typeof filterNames).toBe('function')
  })

  it('Should return an array with written champion\'s name data', () => {
      let id = ('ahri').toUpperCase()
      expect(filterNames(dataLol, id)).toEqual([{id: "Ahri", name: "Ahri", title: "the Nine-Tailed Fox", info: { attack: 3, defense: 4, magic: 8, difficulty: 5 }, tags: ["Mage", "Assassin"]}])
 })
})


describe('filterByTag', () => {
  it('filterByTag should be a function', () => {
    expect(typeof filterByTag).toBe('function')
  })

  it('Should return an array with selected champion\'s class data', () => {
    expect(filterByTag(dataLol, 'Marksman')).toEqual([
      { id: "Vayne", name: "Vayne", title: "the Night Hunter", info: { attack: 10, defense: 1, magic: 1, difficulty: 8 }, tags: ["Marksman", "Assassin"] }])
  })
});


describe('difficultyOrder', () => {
  it('difficultyOrder should be a function', () => {
    expect(typeof difficultyOrder).toBe('function')
  })

  
  it('Should return an array with all champions filtered by difficulty from weakest to strongest', () => {
    expect(difficultyOrder(dataLol, '1')).toEqual(order)
  })

  it('Should return an array filtered by difficulty from weakest to strongest among the Easiest Champions', () => {
    expect(difficultyOrder(dataLol, '2')).toEqual([
      {id: "Aatrox", name: "Aatrox", title: "the Darkin Blade", info: {attack: 8, defense: 4, magic: 3, difficulty: 4}, tags: ["Fighter", "Tank"]}])
  })

  it('Should return an array filtered by difficulty from weakest to strongest among the Medium Champions', () => {
    expect(difficultyOrder(dataLol, '3')).toEqual([
      {id: "Ahri", name: "Ahri", title: "the Nine-Tailed Fox", info: { attack: 3, defense: 4, magic: 8, difficulty: 5 }, tags: ["Mage", "Assassin"]},
      {id: "Irelia", name: "Irelia", title: "the Will of the Blades", info: {attack: 7, defense: 4, magic: 5, difficulty: 5}, tags: ["Fighter", "Assassin"]},
      {id: "Zilean", name: "Zilean", title: "the Chronokeeper", info: {attack: 2, defense: 5, magic: 8, difficulty: 6}, tags: ["Support", "Mage"]}])
  })

  it('Should return an array filtered by difficulty from weakest to strongest among the Hardest Champions', () => {
    expect(difficultyOrder(dataLol, '4')).toEqual([
      { id: "Vayne", name: "Vayne", title: "the Night Hunter", info: { attack: 10, defense: 1, magic: 1, difficulty: 8 }, tags: ["Marksman", "Assassin"]}])
  })

   
  it('Should return an array', () => {
    expect(difficultyOrder(dataLol, '20')).toEqual(dataLol)
  })

})

describe('mediaInfo', () => {
  it('mediaInfo should be a function', () => {
    expect(typeof mediaInfo).toBe('function')
  })

  it('Should return a average amount  of assassins\'s attack', () => {
    expect(mediaInfo(tagAssassin, 'attack')).toBe(7)
  })
});
