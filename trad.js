const PAGE_TRANSLATIONS = {
    index: {
        en: {
            pageTitle: "Dr.Taiko's portfolio",
            avatarAlt: "Welcome to my portfolio, enjoy reading!",
            heroSubtitle: "...",
            aboutTitle: "About myself",
            aboutText: "Heya! I'm Dr.Taiko, and I am someone who LOVES technology since I was little, and I'm obsessed with trying silly things like playing Half-Life 2 on every device I own, homebrewing consoles and install mods for 5+ hours while knowing that I'll play it once and then never touch it again, ricing my Linux even though I should be working etc... In short, I'm a busy person for the wrong reasons. But SOMETIMES I lock in and do the job for real.",
            projectsTitle: "My projects :",
            project1: "IMBATABLE : A fan-made UNBEATABLE French translation mod.",
            project2: "Nothing (yet!)",
            project3: "Nothing (yet!)",
            project4: "Nothing (yet!)",
            discordAria: "...",
            mailAria: "...",
            githubAria: "..."
        }
    }
};

function getPageKey() {
    return "index";
}

function captureOriginalState() {
    const original = {
        text: {},
        alt: {},
        aria: {},
        pageTitle: document.title
    };

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (key && !Object.prototype.hasOwnProperty.call(original.text, key)) {
            original.text[key] = element.textContent;
        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const key = element.getAttribute("data-i18n-alt");
        if (key && !Object.prototype.hasOwnProperty.call(original.alt, key)) {
            original.alt[key] = element.getAttribute("alt") || "";
        }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const key = element.getAttribute("data-i18n-aria");
        if (key && !Object.prototype.hasOwnProperty.call(original.aria, key)) {
            original.aria[key] = element.getAttribute("aria-label") || "";
        }
    });

    return original;
}

function restoreOriginalState(original) {
    document.documentElement.lang = "fr";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (key && Object.prototype.hasOwnProperty.call(original.text, key)) {
            element.textContent = original.text[key];
        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const key = element.getAttribute("data-i18n-alt");
        if (key && Object.prototype.hasOwnProperty.call(original.alt, key)) {
            element.setAttribute("alt", original.alt[key]);
        }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const key = element.getAttribute("data-i18n-aria");
        if (key && Object.prototype.hasOwnProperty.call(original.aria, key)) {
            element.setAttribute("aria-label", original.aria[key]);
        }
    });

    document.title = original.pageTitle;
}

function setActiveLanguageButton(lang) {
    document.querySelectorAll(".lang-btn").forEach((button) => {
        const isActive = button.getAttribute("data-lang") === lang;
        button.classList.toggle("active", isActive);
    });
}

function applyLanguage(lang, original) {
    if (lang === "fr") {
        restoreOriginalState(original);
        setActiveLanguageButton("fr");
        localStorage.setItem("siteLanguage", "fr");
        return;
    }

    const pageKey = getPageKey();
    const dictionary = PAGE_TRANSLATIONS[pageKey]?.en;

    if (!dictionary) return;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (key && Object.prototype.hasOwnProperty.call(dictionary, key)) {
            element.textContent = dictionary[key];
        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const key = element.getAttribute("data-i18n-alt");
        if (key && Object.prototype.hasOwnProperty.call(dictionary, key)) {
            element.setAttribute("alt", dictionary[key]);
        }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const key = element.getAttribute("data-i18n-aria");
        if (key && Object.prototype.hasOwnProperty.call(dictionary, key)) {
            element.setAttribute("aria-label", dictionary[key]);
        }
    });

    if (dictionary.pageTitle) {
        document.title = dictionary.pageTitle;
    }

    setActiveLanguageButton("en");
    localStorage.setItem("siteLanguage", "en");
}

function initLanguageSwitcher() {
    const original = captureOriginalState();
    const storedLang = localStorage.getItem("siteLanguage");
    const initialLang = storedLang === "en" ? "en" : "fr";

    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const lang = button.getAttribute("data-lang");
            if (lang === "fr" || lang === "en") {
                applyLanguage(lang, original);
            }
        });
    });

    applyLanguage(initialLang, original);
}

document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
