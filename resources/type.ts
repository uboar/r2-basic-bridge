import { basicAuth } from 'hono/basic-auth';

type Args = Parameters<typeof basicAuth>

export type BridgeFile = {
	filename: string;
	endpoint: string;
  cors: string[];
	auth: Args;
};

