import assert from "node:assert/strict";
import test from "node:test";
import { searchArticles, cleanSearchQuery } from "../src/lib/search/search-articles.ts";
import { sampleArticles } from "../src/lib/articles/mock-articles.ts";

const slugs = (results) => results.map((article) => article.slug);

test("matches titles regardless of case", () => {
  assert.deepEqual(slugs(searchArticles(sampleArticles, "ĐI BỘ")), ["di-bo"]);
});

test("matches Vietnamese accents, crossed d, and decomposed Unicode", () => {
  for (const query of ["doc lai", "ĐỌC LẠI", "đọc lại".normalize("NFD")]) {
    assert.deepEqual(slugs(searchArticles(sampleArticles, query)), ["doc-lai"]);
  }
});

test("trims and collapses excess whitespace", () => {
  assert.equal(cleanSearchQuery("  đi \n bộ\t "), "đi bộ");
  assert.deepEqual(slugs(searchArticles(sampleArticles, "  di   bo  ")), ["di-bo"]);
});

test("empty, whitespace, and missing queries return no articles", () => {
  assert.deepEqual(searchArticles(sampleArticles), []);
  assert.deepEqual(searchArticles(sampleArticles, ""), []);
  assert.deepEqual(searchArticles(sampleArticles, " \n\t "), []);
});

test("unmatched queries return no results", () => {
  assert.deepEqual(searchArticles(sampleArticles, "khong-co-tu-khoa-nay"), []);
});

test("matches excerpts, even when the title does not contain the phrase", () => {
  assert.deepEqual(slugs(searchArticles(sampleArticles, "tach tra")), ["nhung-khoang-dung"]);
});

test("topic names return multiple matching articles", () => {
  assert.deepEqual(slugs(searchArticles(sampleArticles, "DOI SONG")), ["nhung-khoang-dung", "dieu-binh-thuong"]);
  assert.deepEqual(slugs(searchArticles(sampleArticles, "doc & viet")), ["doc-lai", "trang-giay"]);
});

test("sorts newest first without mutating the input array", () => {
  const input = Object.freeze([...sampleArticles].reverse());
  const original = slugs(input);
  assert.deepEqual(slugs(searchArticles(input, "doi song")), ["nhung-khoang-dung", "dieu-binh-thuong"]);
  assert.deepEqual(slugs(input), original);
});

test("excludes a draft that otherwise matches, even with a publication date", () => {
  const draft = { ...sampleArticles[0], id: "private", slug: "private", status: "draft" };
  assert.deepEqual(slugs(searchArticles([draft, sampleArticles[0]], "tach tra")), ["nhung-khoang-dung"]);
});

test("does not search body content or interpret queries as regex", () => {
  const fixture = { ...sampleArticles[0], title: "Bản mẫu", excerpt: "Trích đoạn", content: [{ type: "paragraph", text: "hiddenword" }] };
  assert.deepEqual(searchArticles([fixture], "hiddenword"), []);
  assert.deepEqual(searchArticles(sampleArticles, ".*"), []);
});
