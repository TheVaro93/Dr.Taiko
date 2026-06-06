const PAGE_TRANSLATIONS = {
    index: {
        fr: {
            pageTitle: "Portfolio de Dr.Taiko",
            avatarAlt: "photo de profil de Dr.Taiko",
            heroSubtitle: "Bienvenue sur mon portfolio, bonne lecture !",
            aboutTitle: "À propos de moi",
            aboutText: "Bonjour, je suis Dr.Taiko et depuis que je suis tout petit, J'ADORE la technologie. J'ai développé une véritable obsession pour les petits projets idiots comme jouer à Half-Life 2 sur les plateformes les plus instables possibles, installer des mods sur mes consoles pendant des heures en sachant pertinemment que je n'y jouerai qu'une fois car je suis un gros flemmard, ou encore personnaliser mon Linux au lieu de travailler. Bref, je suis quelqu'un d'occupé, pour toutes les mauvaises raisons. Cependant, il m'arrive (c'est rare mdr) de me concentrer sur une tâche et de la réaliser sérieusement.",
            projectsTitle: "Mes projets",
            project1: "IMBATABLE : un mod de traduction française du jeu vidéo UNBEATABLE.",
            project2: "Rien (pour l'instant !)",
            project3: "Rien (pour l'instant !)",
            project4: "Rien (pour l'instant !)",
            footercopyright: "© 2026 Dr.Taiko sous MIT License (ne pas voler sinon j'irais vous botter les fesses) - ",
            footerNote: "Fait avec beaucoup d'amour, sans sucre ajouté !",
            discordAria: "Serveur Discord",
            mailAria: "Email",
            githubAria: "GitHub"
        }
    }
};
 
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
    document.documentElement.lang = "en";
 
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
    if (lang === "en") {
        restoreOriginalState(original);
        setActiveLanguageButton("en");
        localStorage.setItem("siteLanguage", "en");
        return;
    }
 
    const dictionary = PAGE_TRANSLATIONS.index?.fr;
    if (!dictionary) return;
 
    document.documentElement.lang = "fr";
 
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
 
    setActiveLanguageButton("fr");
    localStorage.setItem("siteLanguage", "fr");
}
 
function initLanguageSwitcher() {
    const original = captureOriginalState();
    const storedLang = localStorage.getItem("siteLanguage");
    const initialLang = storedLang === "fr" ? "fr" : "en";
 
    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const lang = button.getAttribute("data-lang");
            if (lang === "en" || lang === "fr") {
                applyLanguage(lang, original);
            }
        });
    });
 
    applyLanguage(initialLang, original);
}
 
document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
