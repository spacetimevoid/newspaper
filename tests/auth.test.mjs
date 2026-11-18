import assert from "node:assert/strict";
import test from "node:test";
import { authenticateAdmin, checkAdmin, endSession, safeAdminRedirect } from "../src/lib/auth/policy.ts";

function fixture(overrides = {}) {
  const calls = { membership: 0, logout: 0 };
  return { calls, gateway: {
    async user() { return { id: "admin-id", email: "author@example.test" }; },
    async allowed(id) { calls.membership++; return id === "admin-id"; },
    async signIn() { return true; },
    async signOut() { calls.logout++; return true; },
    ...overrides,
  } };
}
test("anonymous and expired/revoked sessions are denied before membership lookup", async () => {
  const { gateway, calls } = fixture({ async user() { return null; } });
  assert.equal(await checkAdmin(gateway), null);
  assert.equal(calls.membership, 0);
});
test("authenticated non-admin is denied without trusting metadata", async () => {
  const { gateway } = fixture({ async allowed() { return false; }, async user() { return { id: "other", user_metadata: { admin: true } }; } });
  assert.equal(await checkAdmin(gateway), null);
});
test("authorized admin is returned only after live identity and membership checks", async () => {
  const { gateway, calls } = fixture();
  assert.equal((await checkAdmin(gateway)).id, "admin-id");
  assert.equal(calls.membership, 1);
});
test("auth and database failures fail closed", async () => {
  for (const method of ["user", "allowed"]) {
    const { gateway } = fixture({ async [method]() { throw Error("unavailable"); } });
    assert.equal(await checkAdmin(gateway), null);
  }
});
test("invalid credentials do not authorize", async () => {
  const { gateway, calls } = fixture({ async signIn() { return false; } });
  assert.equal(await authenticateAdmin(gateway, "author@example.test", "wrong"), null);
  assert.equal(calls.membership, 0);
});
test("valid credentials for a non-admin trigger local signout", async () => {
  const { gateway, calls } = fixture({ async allowed() { return false; } });
  assert.equal(await authenticateAdmin(gateway, "author@example.test", "password"), null);
  assert.equal(calls.logout, 1);
});
test("valid credentials still require admin check", async () => {
  const { gateway } = fixture();
  assert.equal((await authenticateAdmin(gateway, "author@example.test", "password")).id, "admin-id");
});
test("malformed credentials and oversized inputs are rejected", async () => {
  const { gateway } = fixture({ async signIn() { throw Error("must not be called"); } });
  for (const [email, password] of [["", "x"], ["invalid", "x"], ["a@b.test", ""], ["a@b.test", "x".repeat(4097)]]) {
    assert.equal(await authenticateAdmin(gateway, email, password), null);
  }
});
test("logout succeeds and subsequent session validation denies access", async () => {
  let current = { id: "admin-id" };
  const { gateway } = fixture({ async user() { return current; }, async signOut() { current = null; return true; } });
  assert(await checkAdmin(gateway));
  assert.equal(await endSession(gateway), true);
  assert.equal(await checkAdmin(gateway), null);
});
test("logout failure is not reported as successful", async () => {
  for (const signOut of [async () => false, async () => { throw Error("network"); }]) {
    assert.equal(await endSession(fixture({ signOut }).gateway), false);
  }
});
test("redirect targets cannot escape the known admin destination", () => {
  for (const target of [null, undefined, "", "https://evil.test", "//evil.test", "\\evil.test", "/admin/login", "/admin/articles?next=https://evil.test", "/%2f%2fevil.test", "javascript:alert(1)", "/admin/articles"]) {
    assert.equal(safeAdminRedirect(target), "/admin/articles");
  }
});
