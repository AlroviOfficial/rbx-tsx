/**
 * Regular expressions — compiles to luau-regexp (RegExp)
 * Requires: ReplicatedStorage.Packages.RegExp (Roblox/luau-regexp)
 */

// Regex literal → RegExp(pattern, flags)
const digitPattern = /\d+/g;
const emailPattern = /^[a-z]+@[a-z]+\.[a-z]+$/i;

// .test(str) → regex:test(str)
const hasDigits = digitPattern.test("abc123");
const looksLikeEmail = emailPattern.test("user@example.com");

// .exec(str) → regex:exec(str)
const match = digitPattern.exec("price: 99");
if (match) {
  // luau-regexp returns 1-based: match[1] = full match, match.index = position
  console.log(match[1], match.index);
}

// str.match(regex) → regex:exec(str)
const parts = "hello world".match(/l+/g);

// new RegExp(pattern, flags)
const dynamicPattern = new RegExp("\\d{2,4}", "g");

// str.replace(regex, repl) — uses regex.source with string.gsub (Lua pattern)
// Complex regex patterns may need manual conversion
const cleaned = "  spaces  ".replace(/\s+/g, " ");
