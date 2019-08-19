export const imports = {
  'src/guides/Colors/index.md': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-guides-colors-index" */ 'src/guides/Colors/index.md'
    ),
}
