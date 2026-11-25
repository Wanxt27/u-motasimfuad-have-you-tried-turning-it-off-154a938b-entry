// Have You Tried Turning It Off? — make.fun entry.
// Writes one funny line a hopeless tech support agent says to a desperate
// customer to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The joke: the agent cheerfully admits the classic restart question is
// not step one of a plan — it is the whole of his training.
const line =
  "Have you tried turning it off and on again? I ask because that is genuinely the full extent of my training.";

// Gate: the sealed scorer wants UTF-8 text of 1-199 characters, not only
// whitespace — anything else is refused outright, so check it here first.
const MAX_CHARS = 199;
const chars = [...line].length;
const bytes = Buffer.byteLength(line, "utf8");
if (
  chars < 1 ||
  chars > MAX_CHARS ||
  bytes > MAX_CHARS ||
  line.includes("\n") ||
  line.trim() !== line ||
  line.trim().length === 0
) {
  throw new Error(`line fails the gate (${chars} chars, ${bytes} bytes)`);
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the line, nothing extra.
writeFileSync("/output/entry.txt", line, "utf8");

// Read back what was written: the file the judge sees must be the line,
// byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== line) {
  throw new Error("entry.txt does not match the line");
}
