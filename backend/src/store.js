// in memory store
const users = [];

function emptyFavs() {
  return { characters: [], books: [], houses: [] };
}

module.exports = { users, emptyFavs };
