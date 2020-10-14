const { registerBlockType } = wp.blocks;

registerBlockType("first-es6-block/test-block", {
    title: "New Block Style",
    description: "This is my first ES6 test block.",
    icon: "smiley",
    category: "layout",
    edit: ({ className }) => <div className={className}>Hello, From the editor.</div>,
    save: () => <div>This is the UI.</div>,
});
