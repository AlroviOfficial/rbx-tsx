/**
 * Async/await patterns — compiles to Promise.new + :expect()
 */

async function fetchConfig(): Promise<{ timeout: number }> {
  return Promise.resolve({ timeout: 5000 });
}

async function loadData(): Promise<string> {
  const config = await fetchConfig();
  return `Loaded with timeout ${config.timeout}`;
}

async function main() {
  try {
    const result = await loadData();
    console.log(result);
  } catch (err) {
    console.error("Failed:", err);
  }
}

main();
