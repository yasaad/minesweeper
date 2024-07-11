import { c as pop, p as push } from "../../chunks/index.js";
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<!--[-->`;
  children($$payload);
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _layout as default
};
