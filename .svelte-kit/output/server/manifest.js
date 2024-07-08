export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DYVM5VWO.js","app":"_app/immutable/entry/app.BGpPkUM3.js","imports":["_app/immutable/entry/start.DYVM5VWO.js","_app/immutable/chunks/entry.BWt82ryH.js","_app/immutable/chunks/runtime.BNACdMx9.js","_app/immutable/entry/app.BGpPkUM3.js","_app/immutable/chunks/if.DB6ca8XY.js","_app/immutable/chunks/runtime.BNACdMx9.js","_app/immutable/chunks/disclose-version.0b-cXPwx.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
