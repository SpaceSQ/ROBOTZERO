import assert from "node:assert/strict";
import test from "node:test";
import { KEYWORD_PASS, PRODUCTS, geoDocument, inquiryMail, llmsTxt, parseInquiry } from "./site.ts";

test("each product introduction is 300 characters", () => {
  for (const product of PRODUCTS) {
    assert.equal(product.blurb.length, 300, product.id);
  }
});

test("the keyword pass is one shared arrangement", () => {
  const parts = KEYWORD_PASS.split("|");
  assert.equal(new Set(parts).size, parts.length);
  assert.equal(parts[0], "Robotzero");
  assert.equal(parts.at(-1), "robotzero.com");
  assert.equal(geoDocument().keywordPass, KEYWORD_PASS);
  assert.match(llmsTxt(), new RegExp(KEYWORD_PASS.replace(/[|]/g, "\\|")));
  for (const product of PRODUCTS) assert.match(llmsTxt(), new RegExp(product.href.replace(/[.]/g, "\\.")));
  const byId = Object.fromEntries(PRODUCTS.map((product) => [product.id, product.href]));
  assert.equal(byId.s2, "https://aios.space2.world");
  assert.equal(byId.rao, "https://rao.space2.world");
  assert.equal(byId.ras, "https://www.robot0.com/RAS");
  assert.equal(byId.s2.includes("github.com"), false);
  assert.equal(byId.rao.includes("github.com"), false);
  assert.equal(byId.ras.includes("github.com"), false);
});

test("an agent can submit research or funding", () => {
  const research = parseInquiry({
    lane: "research",
    organization: "示例安全实验室",
    name: "联系人",
    email: "Lab@Example.com",
    topic: "联合研究工作组",
    message: "希望成立联合研究工作组。",
    client: "bot",
    agent: "field-agent",
  });
  assert.equal(research.ok, true);
  if (!research.ok) return;
  assert.equal(research.value.client, "agent");
  assert.equal(research.value.email, "lab@example.com");
  assert.match(inquiryMail(research.value).subject, /^Robotzero 研究合作｜/);
  assert.match(inquiryMail(research.value).text, /keywordPass:/);

  const funding = parseInquiry({
    lane: "funding",
    organization: "示例家庭基金",
    name: "基金经理",
    email: "fund@example.com",
    topic: "家庭基金",
    message: "希望了解投资方式。",
    client: "agent",
    agent: "fund-bot",
  });
  assert.equal(funding.ok, true);
});

test("bad mail, the wrong lane topic, and the honeypot are refused", () => {
  assert.equal(
    parseInquiry({
      lane: "research",
      organization: "实验室",
      name: "甲",
      email: "not-an-email",
      topic: "AI安全机构",
      message: "希望合作研究。",
    }).ok,
    false,
  );
  assert.equal(
    parseInquiry({
      lane: "research",
      organization: "实验室",
      name: "甲",
      email: "a@b.co",
      topic: "家庭基金",
      message: "希望合作研究。",
    }).ok,
    false,
  );
  const trap = parseInquiry({
    lane: "funding",
    organization: "某基金",
    name: "乙",
    email: "a@b.co",
    topic: "公益基金",
    message: "希望资助。",
    company_website: "https://spam.example",
  });
  assert.deepEqual(trap, { ok: false, error: "honeypot" });
});
