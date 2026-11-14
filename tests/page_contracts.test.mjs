import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';

await mkdir('node_modules/.tmp', { recursive: true });
await build({
  stdin: { contents: `export { HeroSection } from './src/components/marketing/HeroSection';
export { FinalCTASection } from './src/components/marketing/FinalCTASection';
export { DocsLayout } from './src/components/docs/docs_layout';
export { CodeBlock } from './src/components/docs/code_block';`, resolveDir: process.cwd(), loader: 'tsx' },
  bundle: true, packages: 'external', platform: 'node', format: 'esm',
  outfile: 'node_modules/.tmp/pr30_contracts.mjs',
});
const { HeroSection, FinalCTASection, DocsLayout, CodeBlock } = await import('../node_modules/.tmp/pr30_contracts.mjs');
const { createElement } = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');
function find(node, predicate) {
  if (!node || typeof node !== 'object') return undefined;
  if (predicate(node)) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const match = find(child, predicate);
    if (match) return match;
  }
}
for (const Component of [HeroSection, FinalCTASection]) {
  test(`${Component.name} invokes the supplied signup callback`, () => {
    let calls = 0;
    const tree = Component({ onGetStarted: () => calls++ });
    const button = find(tree, node => typeof node.props?.onClick === 'function');
    assert.ok(button);
    button.props.onClick();
    assert.equal(calls, 1);
  });
}
test('documentation layout preserves content and navigation', () => {
  const html = renderToStaticMarkup(createElement(DocsLayout, null, 'Guide content'));
  assert.match(html, /Guide content/);
  assert.match(html, /href="\/docs\/getting-started"/);
});
test('code blocks escape examples and expose the copy action', () => {
  const html = renderToStaticMarkup(createElement(CodeBlock, { code: '<script>example</script>', language: 'html' }));
  assert.match(html, /&lt;script&gt;example&lt;\/script&gt;/);
  assert.match(html, /aria-label="Copy code"/);
});
