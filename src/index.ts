/*
 * @Author: saber
 * @Date: 2022-01-19 14:20:53
 * @LastEditTime: 2022-01-21 11:08:05
 * @LastEditors: saber
 * @Description:
 */
import type { Plugin } from 'vite';

import type { Options } from './types';
function viteEnvBridge(options: Options): Plugin {
	// TODO: 先按照 别名的方案处理
	return {
		name: 'vite-plugin-env-bridge',
		config(config) {
			// TODO: 先将代码写死, 暂时还没有想好这块的抽象，没有时间
			const env = options.env || 'env';
			const str1 = '@/env-bridge/getInitialState';
			const str1Arr = str1.split('/');
			str1Arr.splice(2, 0, env);
			let str2 = str1Arr.join('/');
			const alias: any = config?.resolve?.alias || {};
			const aliasKeys = Object.keys(alias || {});
			aliasKeys.forEach((key) => {
				if (str2.startsWith(key)) {
					str2 = str2.replace(key, alias[key] as string);
				}
			});

			config.resolve = {
				alias: {
          [str1]: str2,
					...config?.resolve?.alias,
				},
			};
		},
	};
}
export default viteEnvBridge;
