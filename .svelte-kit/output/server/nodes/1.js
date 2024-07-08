

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BRvDB5E5.js","_app/immutable/chunks/disclose-version.0b-cXPwx.js","_app/immutable/chunks/runtime.BNACdMx9.js","_app/immutable/chunks/entry.BWt82ryH.js"];
export const stylesheets = [];
export const fonts = [];
