import { CacheFactory } from '@core/caching/cache.factory';
import { delay } from '@utils/delay';

describe('Caching Test', () => {
    let cacheFactory: CacheFactory;

    beforeEach(async () => {
        cacheFactory = CacheFactory.getInstance();
    });

    afterAll(async () => {
        await cacheFactory.disconnect();
    });

    it('should cache the data till 30 seconds ttl', async () => {
        const details = 'cached data';

        await cacheFactory.cacheData('testCache', details, { ttl: 5 });

        const data = await cacheFactory.getCachedData('testCache');

        expect(data).toBe(details);
        // Wait for TTL to expire (31 seconds to be safe)
        await delay(5000);

        const cachedData = await cacheFactory.getCachedData('testCache');

        expect(cachedData).toBeNull();
    });

    it('should cache the set of data which should not expire', async () => {
        const detail = 'first Cache data';

        await cacheFactory.cacheSetData('setCache', detail);

        const data = await cacheFactory.getCachedSetData('setCache');

        expect(data).toEqual([detail]);

        const detail2 = 'Second Cache Data';

        await cacheFactory.cacheSetData('setCache', detail2);

        const data2 = await cacheFactory.getCachedSetData('setCache');

        expect(data2).toEqual([detail, detail2]);

        await cacheFactory.setContinually('setCache', 5);

        await delay(5000);

        const data3 = await cacheFactory.getCachedSetData('setCache');

        expect(data3).toEqual([]);
    });

    it('should cache the string data which should not expire', async () => {
        const data = 'Permanent test data';

        await cacheFactory.cacheData('permanentCache', data);

        await delay(5000);

        const cachedData = await cacheFactory.getCachedData('permanentCache');

        expect(cachedData).toEqual(data);
    });

    it('should delete the persisted cache', async () => {
        const key = 'permanentCache';

        await cacheFactory.deleteCachedData(key);

        const cachedData = await cacheFactory.getCachedData(key);

        expect(cachedData).toBeNull();
    });
});
