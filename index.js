export default {
  id: "nyaa",
  name: "Nyaa",
  type: "torrent",
  lang: ["en"],
  async search(query) {
    const url = `https://nyaa.si/?f=0&c=0_0&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const html = await res.text();

    const regex = /<a href="\/view\/(\d+)".+?title="(.+?)".+?magnet:\?xt=urn:btih:([a-fA-F0-9]+)&/g;
    const results = [];

    for (const match of html.matchAll(regex)) {
      results.push({
        title: match[2],
        link: `magnet:?xt=urn:btih:${match[3]}`,
        seeds: 0,
        peers: 0,
        size: "Unknown",
      });
    }

    return results;
  },
};
