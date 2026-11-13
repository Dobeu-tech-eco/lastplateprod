import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('editing each signup field clears only its own validation error', () => {
  const source = readFileSync(new URL('../src/components/signup/BusinessInfoStep.tsx', import.meta.url), 'utf8');
  const callbacks = [...source.matchAll(/setErrors\(prev => \{([\s\S]*?)\}\);/g)];
  assert.equal(callbacks.length, 5);
  for (const [index, field] of ['firstName', 'lastName', 'businessName', 'cuisineType', 'locationsCount'].entries()) {
    const previous = { [field]: 'Required', other: 'Keep this error' };
    const clear = new Function('prev', callbacks[index][1]);
    assert.deepEqual(clear(previous), { other: 'Keep this error' });
    assert.equal(previous[field], 'Required');
  }
});
