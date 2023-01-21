/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
    defaultLocale: "cs",
    locales: ["cs", "en"],
    namespaces: ["footer", "index", "printpdfcomponent", "shared", "languagePopup"],
    defaultNamespace: "common",
    i18nextServer: {
        debug: true,
        backend: {
            loadPath: "./public/locales/{{lng}}/{{ns}}.json",
        },
    },
    i18nextClient: {
        debug: true,
    },
};
