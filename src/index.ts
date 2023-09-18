type Bindings = {
	BUCKET: R2Bucket;
};

import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';
import { cors } from 'hono/cors';
import { bridgeFiles } from '../resources/resources';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/ping', (c) => c.text('API is alive'));

bridgeFiles.forEach((file) => {
	app.use(`/download/${file.endpoint}`, basicAuth(...file.auth));
	app.use(
		`/download/${file.endpoint}`,
		cors({
			origin: file.cors,
		})
	);
	app.get(`/download/${file.endpoint}`, async (c) => {
		const object = await c.env.BUCKET.get(file.filename);
		if (object === null) {
			return c.text('Not Found', 404);
		}
		const headers = new Headers();
		object.writeHttpMetadata(headers);
		headers.set('etag', object.httpEtag);

		return c.newResponse(object.body, 200, {...headers})
	});
});

export default app;
