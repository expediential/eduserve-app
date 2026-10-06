import { describe, expect, it } from 'vitest';
import { UnifiedDataService, sourcePriority } from '../src/services/unifiedDataService';
describe('UnifiedDataService', () => {
  it('keeps demo data explicitly labelled and provides every configured source kind', async () => { const snapshot = await new UnifiedDataService().getSnapshot(); expect(snapshot.mode).toBe('demo'); expect(Object.keys(snapshot.sources)).toHaveLength(Object.keys(sourcePriority).length); expect(snapshot.sources.attendance).toBe('mock'); });
});
