import { BridgeFile } from './type';

export const bridgeFiles: BridgeFile[] = [
	{
		filename: 'test.txt',
		endpoint: 'test',
		cors: ['*'],
		auth: [
			{
				username: 'test',
				password: 'test',
			},
			{
				username: 'test2',
				password: 'test2',
			},
		],
	},
];
