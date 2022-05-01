import { load } from "cheerio";

const crawler = async (name: string) => {
  try {
    const html = await fetch(
      `https://github.com/${encodeURIComponent(name)}`
    ).then((res) => res.text());
    const $ = load(html);
    return $("[data-count]")
      .map((i, el) => ({
        count: $(el).data("count"),
        level: $(el).data("level"),
        date: $(el).data("date"),
      }))
      .toArray();
  } catch (error) {
    return [];
  }
};

export default crawler;
