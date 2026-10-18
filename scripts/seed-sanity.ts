/**
 * Initial content seed already ran from messages JSON.
 * Editorial copy now lives only in Sanity — messages/*.json keep UI chrome only.
 *
 * To re-seed: restore editorial keys from git history, then re-run, or enter content in Studio.
 */
console.error(
  'sanity:seed disabled: editorial content was removed from messages/*.json. Use Studio or restore seed source from git.',
);
process.exit(1);
