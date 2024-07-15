import type { Theme } from "vitepress";
import Sencilla from "sencilla/Layout.vue";
import "./custom.scss";
import "sencilla";

export default {
  Layout: Sencilla,
} satisfies Theme;
