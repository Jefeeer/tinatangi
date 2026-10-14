// Run with:  npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { statusAt, statusText, fmtClock, toMin, zonedNow } from "./hours.ts";

const wk = [...Array(7)].map((_, i) => ({ weekday: i, label: "D" + i, open: "07:00" as string | null, close: "24:00" as string | null }));

test("open during the day, with closing-soon after 11 PM", () => {
  assert.equal(statusAt(wk, 1, toMin("16:00")).open, true);
  assert.equal(statusText(statusAt(wk, 1, toMin("16:00"))), "Open now, until 12:00 MN");
  assert.equal(statusText(statusAt(wk, 1, toMin("23:30"))), "Open now, closing at 12:00 MN");
  assert.equal(statusText(statusAt(wk, 1, toMin("07:00"))), "Open now, until 12:00 MN");
});

test("closed before opening and after midnight", () => {
  assert.deepEqual(statusAt(wk, 1, toMin("06:59")), { open: false, when: "today", at: "07:00" });
  assert.equal(statusText(statusAt(wk, 1, toMin("03:00"))), "Closed now, opens 7:00 AM");
  assert.equal(statusAt(wk, 1, toMin("00:00")).open, false);
});

test("closing after midnight carries into the next day", () => {
  const late = wk.map((d) => ({ ...d, close: "01:00" }));
  assert.equal(statusAt(late, 2, toMin("00:30")).open, true);
  assert.equal(statusAt(late, 2, toMin("01:30")).open, false);
});

test("skips closed days", () => {
  const shut = wk.map((d, i) => (i === 2 ? { ...d, open: null, close: null } : d));
  assert.deepEqual(statusAt(shut, 1, toMin("03:00")), { open: false, when: "today", at: "07:00" });
  assert.deepEqual(statusAt(shut, 1, toMin("23:59")).open, true);
});

test("time formatting", () => {
  assert.equal(fmtClock("07:00"), "7:00 AM");
  assert.equal(fmtClock("24:00"), "12:00 MN");
  assert.equal(fmtClock("12:00"), "12:00 PM");
  assert.equal(fmtClock("21:30"), "9:30 PM");
});

test("Manila time ignores visitor timezone", () => {
  // 2026-10-11T07:30Z is 15:30 Sunday in Manila (UTC+8)
  assert.deepEqual(zonedNow("Asia/Manila", new Date("2026-10-11T07:30:00Z")), { day: 0, mins: 15 * 60 + 30 });
  // 2026-10-11T16:30Z is 00:30 Monday in Manila
  assert.deepEqual(zonedNow("Asia/Manila", new Date("2026-10-11T16:30:00Z")), { day: 1, mins: 30 });
});
