

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BEYhcm9_.js","_app/immutable/chunks/disclose-version.0b-cXPwx.js","_app/immutable/chunks/runtime.BNACdMx9.js"];
export const stylesheets = ["_app/immutable/assets/0.BNKhyFhy.css"];
export const fonts = [];
