wp.blocks.registerBlockType("sg-block/simple-block", {
    title: wp.i18n.__("Simple Block"),
    description: wp.i18n.__("This is a simple block."),
    icon: "universal-access",
    category: "common",
    edit: () => {
        return wp.element.createElement("p", { className: "custom-block" }, "Hello Shubham!");
    },
    save: () => {
        return wp.element.createElement(
            "p",
            { className: "simple-block" },
            "Hello world frontend!"
        );
    },
});
