

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CGwc-OCV.js","_app/immutable/chunks/disclose-version.0b-cXPwx.js","_app/immutable/chunks/runtime.BNACdMx9.js","_app/immutable/chunks/if.DB6ca8XY.js"];
export const stylesheets = [];
export const fonts = [];
