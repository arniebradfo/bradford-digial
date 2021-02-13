// https://stackoverflow.com/a/45887328/5648839
// https://webpack.js.org/guides/typescript/#importing-other-assets
declare module "*.svg" {
    const content: any;
    export default content;
}