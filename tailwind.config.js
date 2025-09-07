// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            screens: {
                'mobile-xs': { 'raw': '(min-height: 700px)' },   // like xl but for height
                'mobile-md': { 'raw': '(max-height: 1000px)' },  // like xs but for height
            },
        },
    },
}
