/**
 * ESGAE — Inscription en Ligne (Projet IHM L3)
 * Logique interactive, sélecteur dynamique Cycle -> Filière,
 * validation ergonomique stricte (lettres uniquement, e-mail rigoureux, date/lieu de naissance),
 * indicatifs internationaux et Mode Présentation Soutenance.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Catalogue dynamique des filières ESGAE par niveau d'études ---
    const ESGAE_PROGRAMS_BY_LEVEL = {
        BTS: [
            'BTS Analyse & Programmation (AP)',
            'BTS Informatique de Gestion',
            'BTS Réseaux & Télécommunications',
            'BTS Comptabilité & Gestion des Entreprises',
            'BTS Commerce International & Marketing',
            'BTS Assistant de Direction & Gestion'
        ],
        LICENCE: [
            'Licence 1 — Tronc Commun Informatique & Gestion',
            'Licence 2 — Analyse & Programmation',
            'Licence 3 — Administration Systèmes & Réseaux (ASR)',
            'Licence 3 — Génie Logiciel (GL)',
            'Licence 3 — Administration des Bases de Données (ABD)',
            'Licence 3 — Comptabilité, Contrôle & Audit (CCA)',
            'Licence 3 — Banque, Finance & Assurance'
        ],
        MASTER: [
            'Master 1 — Ingénierie des Systèmes d’Information',
            'Master 2 — Architecture Logicielle & Big Data',
            'Master 1 — Management Stratégique & Entrepreneuriat',
            'Master 2 — Audit, Contrôle de Gestion & Finance',
            'Master 2 — Gestion des Ressources Humaines (GRH)'
        ]
    };

    const LEVEL_LABELS = {
        BTS: 'Cycle BTS (Bac +2)',
        LICENCE: 'Cycle Licence (L1 – L3)',
        MASTER: 'Cycle Master (M1 – M2)'
    };

    // --- 2. Sélection des éléments du DOM ---
    const form = document.getElementById('registrationForm');
    const fields = {
        lastName: document.getElementById('lastName'),
        firstName: document.getElementById('firstName'),
        birthDate: document.getElementById('birthDate'),
        birthPlace: document.getElementById('birthPlace'),
        email: document.getElementById('email'),
        studyLevel: document.getElementById('studyLevel'),
        program: document.getElementById('program'),
        phone: document.getElementById('phone')
    };

    const countryCodeSelect = document.getElementById('countryCode');
    const customDialCodeInput = document.getElementById('customDialCode');

    const errors = {
        lastName: document.getElementById('lastNameError'),
        firstName: document.getElementById('firstNameError'),
        birthDate: document.getElementById('birthDateError'),
        birthPlace: document.getElementById('birthPlaceError'),
        email: document.getElementById('emailError'),
        studyLevel: document.getElementById('studyLevelError'),
        program: document.getElementById('programError'),
        phone: document.getElementById('phoneError')
    };

    const statuses = {
        lastName: document.getElementById('lastNameStatus'),
        firstName: document.getElementById('firstNameStatus'),
        birthPlace: document.getElementById('birthPlaceStatus'),
        email: document.getElementById('emailStatus'),
        phone: document.getElementById('phoneStatus')
    };

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnIcon = document.getElementById('submitBtnIcon');
    const autosaveBadge = document.getElementById('autosaveBadge');
    const resetDraftBtn = document.getElementById('resetDraftBtn');

    // Éléments Thème & Mode Soutenance IHM
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const ihmModeBtn = document.getElementById('ihmModeBtn');
    const ihmBtnLabel = document.getElementById('ihmBtnLabel');
    const ihmBanner = document.getElementById('ihmBanner');
    const ihmCallouts = document.querySelectorAll('.ihm-callout');

    // Modales
    const successModal = document.getElementById('successModal');
    const recapBox = document.getElementById('recapBox');
    const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');

    const compareModal = document.getElementById('compareModal');
    const openCompareModalBtn = document.getElementById('openCompareModalBtn');
    const closeCompareModalBtn = document.getElementById('closeCompareModalBtn');
    const closeCompareFooterBtn = document.getElementById('closeCompareFooterBtn');

    const STORAGE_KEY = 'esgae_ihm_inscription_draft_v4';
    const THEME_KEY = 'esgae_ihm_theme';

    // Icônes SVG de rétroaction (Feedback visuel)
    const ICON_VALID = `<svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`;
    const ICON_INVALID = `<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

    const PHONE_PLACEHOLDERS = {
        '+242': '06 123 45 67',
        '+243': '812 345 678',
        '+241': '07 12 34 56',
        '+237': '6 71 23 45 67',
        '+225': '07 12 34 56 78',
        '+221': '77 123 45 67',
        '+33': '6 12 34 56 78',
        '+1': '514 123 4567',
        'OTHER': 'Ex : 612 345 678'
    };

    const touched = {
        lastName: false,
        firstName: false,
        birthDate: false,
        birthPlace: false,
        email: false,
        studyLevel: false,
        program: false,
        phone: false
    };

    // --- 3. Sélecteur Dynamique : Mise à jour des filières selon le cycle ---
    function populateProgramsForLevel(level, selectedProgram = '') {
        const programSelect = fields.program;
        programSelect.innerHTML = '';

        if (!level || !ESGAE_PROGRAMS_BY_LEVEL[level]) {
            programSelect.disabled = true;
            programSelect.classList.add('bg-slate-100', 'dark:bg-slate-800/50', 'text-slate-500', 'dark:text-slate-400', 'cursor-not-allowed');
            programSelect.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-900', 'dark:text-white', 'cursor-pointer');
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = "-- Sélectionnez d'abord un cycle --";
            programSelect.appendChild(defaultOpt);
            return;
        }

        programSelect.disabled = false;
        programSelect.classList.remove('bg-slate-100', 'dark:bg-slate-800/50', 'text-slate-500', 'dark:text-slate-400', 'cursor-not-allowed');
        programSelect.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-900', 'dark:text-white', 'cursor-pointer');

        const placeholderOpt = document.createElement('option');
        placeholderOpt.value = '';
        placeholderOpt.textContent = `-- Choisissez votre filière (${LEVEL_LABELS[level]}) --`;
        programSelect.appendChild(placeholderOpt);

        ESGAE_PROGRAMS_BY_LEVEL[level].forEach(prog => {
            const opt = document.createElement('option');
            opt.value = prog;
            opt.textContent = prog;
            if (prog === selectedProgram) {
                opt.selected = true;
            }
            programSelect.appendChild(opt);
        });
    }

    fields.studyLevel.addEventListener('change', () => {
        const chosenLevel = fields.studyLevel.value;
        populateProgramsForLevel(chosenLevel);

        touched.studyLevel = true;
        touched.program = false;
        fields.program.classList.remove('border-emerald-500', 'dark:border-emerald-500', 'border-red-500', 'dark:border-red-500');
        fields.program.classList.add('border-slate-300', 'dark:border-slate-700');
        errors.program.textContent = '';
        errors.program.classList.add('hidden');

        validateField('studyLevel', true);
        updateFormProgress();
        saveDraft();
    });

    // --- 4. Gestion du Thème Clair / Sombre ---
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    });

    // --- 5. Mode Présentation Soutenance IHM ---
    let isIhmModeActive = false;

    ihmModeBtn.addEventListener('click', () => {
        isIhmModeActive = !isIhmModeActive;
        ihmModeBtn.setAttribute('aria-pressed', String(isIhmModeActive));

        if (isIhmModeActive) {
            ihmBanner.classList.remove('hidden');
            ihmCallouts.forEach(el => el.classList.remove('hidden'));
            ihmBtnLabel.textContent = 'Masquer les repères IHM';
            ihmModeBtn.classList.replace('bg-amber-500', 'bg-slate-800');
            ihmModeBtn.classList.replace('hover:bg-amber-600', 'hover:bg-slate-700');
        } else {
            ihmBanner.classList.add('hidden');
            ihmCallouts.forEach(el => el.classList.add('hidden'));
            ihmBtnLabel.textContent = 'Mode Présentation IHM';
            ihmModeBtn.classList.replace('bg-slate-800', 'bg-amber-500');
            ihmModeBtn.classList.replace('hover:bg-slate-700', 'hover:bg-amber-600');
        }
    });

    // --- 6. Gestion de l'indicatif international & formatage souple ---
    function getActiveDialCode() {
        if (countryCodeSelect.value === 'OTHER') {
            return customDialCodeInput.value.trim();
        }
        return countryCodeSelect.value;
    }

    function formatInternationalPhone(value, dialCode) {
        const digits = value.replace(/\D/g, '').slice(0, 15);
        if (dialCode === '+242') {
            if (digits.length <= 2) return digits;
            if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
            if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
            return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
        }
        return digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    }

    countryCodeSelect.addEventListener('change', () => {
        const selected = countryCodeSelect.value;
        if (selected === 'OTHER') {
            customDialCodeInput.classList.remove('hidden');
            customDialCodeInput.focus();
        } else {
            customDialCodeInput.classList.add('hidden');
            customDialCodeInput.value = '';
        }

        fields.phone.placeholder = PHONE_PLACEHOLDERS[selected] || 'Numéro local sans indicatif';
        fields.phone.value = formatInternationalPhone(fields.phone.value, getActiveDialCode());

        if (touched.phone || fields.phone.value.length > 0) {
            validateField('phone', true);
        }
        updateFormProgress();
        saveDraft();
    });

    customDialCodeInput.addEventListener('input', () => {
        let val = customDialCodeInput.value.replace(/[^\d+]/g, '');
        if (val && !val.startsWith('+')) {
            val = '+' + val.replace(/\+/g, '');
        }
        customDialCodeInput.value = val;
        validateField('phone', true);
        updateFormProgress();
        saveDraft();
    });

    // --- 7. Validation Ergonomique Stricte par Champ ---
    const LETTERS_ONLY_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
    // E-mail strict : partie locale valide, nom de domaine avec lettres/chiffres/tirets, et extension (TLD) purement alphabétique (2 à 10 lettres, ex: .com, .cg, .fr, .edu)
    const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,10}$/;

    function validateField(name, showFeedback = true) {
        const input = fields[name];
        const value = input.value.trim();
        let isValid = false;
        let errorMsg = '';

        switch (name) {
            case 'lastName':
                if (!value) {
                    errorMsg = 'Veuillez renseigner votre nom de famille.';
                } else if (!LETTERS_ONLY_REGEX.test(value)) {
                    errorMsg = 'Caractère invalide : seuls les lettres, espaces, traits d’union et apostrophes sont autorisés.';
                } else if (value.length < 2) {
                    errorMsg = 'Le nom doit contenir au moins 2 lettres.';
                } else {
                    isValid = true;
                }
                break;

            case 'firstName':
                if (!value) {
                    errorMsg = 'Veuillez renseigner votre prénom.';
                } else if (!LETTERS_ONLY_REGEX.test(value)) {
                    errorMsg = 'Caractère invalide : seuls les lettres, espaces, traits d’union et apostrophes sont autorisés.';
                } else if (value.length < 2) {
                    errorMsg = 'Le prénom doit contenir au moins 2 lettres.';
                } else {
                    isValid = true;
                }
                break;

            case 'birthDate':
                if (!value) {
                    errorMsg = 'Veuillez renseigner votre date de naissance.';
                } else {
                    const selectedDate = new Date(value + 'T00:00:00');
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const minDate = new Date('1950-01-01T00:00:00');
                    const maxDate = new Date('2015-12-31T00:00:00');

                    if (isNaN(selectedDate.getTime()) || selectedDate > today) {
                        errorMsg = 'Date de naissance invalide (ne peut pas être dans le futur).';
                    } else if (selectedDate < minDate || selectedDate > maxDate) {
                        errorMsg = 'Vérifiez l’année de naissance (doit être comprise entre 1950 et 2015).';
                    } else {
                        isValid = true;
                    }
                }
                break;

            case 'birthPlace':
                if (!value) {
                    errorMsg = 'Veuillez renseigner votre lieu de naissance.';
                } else if (!LETTERS_ONLY_REGEX.test(value)) {
                    errorMsg = 'Caractère invalide : le lieu de naissance ne doit contenir que des lettres.';
                } else if (value.length < 2) {
                    errorMsg = 'Le lieu de naissance doit contenir au moins 2 lettres.';
                } else {
                    isValid = true;
                }
                break;

            case 'email':
                if (!value) {
                    errorMsg = 'L’adresse e-mail est obligatoire pour recevoir votre convocation.';
                } else if (!value.includes('@')) {
                    errorMsg = 'Format d’e-mail invalide : le symbole "@" est manquant (ex : etudiant@gmail.com).';
                } else {
                    const parts = value.split('@');
                    const domain = parts[1] || '';
                    const domainLabels = domain.split('.');
                    const tld = domainLabels[domainLabels.length - 1] || '';

                    if (!STRICT_EMAIL_REGEX.test(value) || domainLabels.length < 2 || !/^[a-zA-Z]{2,10}$/.test(tld)) {
                        errorMsg = `Adresse e-mail mal écrite ("${value}") : utilisez un format valide comme etudiant@gmail.com ou nom@esgae.cg.`;
                    } else {
                        isValid = true;
                    }
                }
                break;

            case 'studyLevel':
                if (!value) {
                    errorMsg = 'Veuillez sélectionner votre cycle d’études (BTS, Licence ou Master).';
                } else {
                    isValid = true;
                }
                break;

            case 'program':
                if (!fields.studyLevel.value) {
                    errorMsg = 'Choisissez d’abord un cycle d’études à gauche.';
                } else if (!value) {
                    errorMsg = 'Veuillez sélectionner une filière dans la liste.';
                } else {
                    isValid = true;
                }
                break;

            case 'phone':
                const dialCode = getActiveDialCode();
                const digitsOnly = value.replace(/\D/g, '');

                if (countryCodeSelect.value === 'OTHER' && !/^\+\d{1,4}$/.test(dialCode)) {
                    errorMsg = 'Veuillez saisir un indicatif international valide (ex : +229, +44, +86).';
                } else if (!digitsOnly) {
                    errorMsg = 'Le numéro de téléphone est obligatoire pour vous joindre.';
                } else if (dialCode === '+242' && digitsOnly.length !== 9) {
                    errorMsg = 'Pour le Congo (+242), le numéro doit comporter 9 chiffres (ex : 06 123 45 67).';
                } else if (digitsOnly.length < 6 || digitsOnly.length > 15) {
                    errorMsg = 'Le numéro international doit comporter entre 6 et 15 chiffres.';
                } else {
                    isValid = true;
                }
                break;
        }

        if (showFeedback && (touched[name] || value.length > 0)) {
            updateFieldUI(name, isValid, errorMsg);
        }

        return isValid;
    }

    function updateFieldUI(name, isValid, errorMsg) {
        const input = fields[name];
        const errorEl = errors[name];
        const statusEl = statuses[name];

        input.classList.remove(
            'border-slate-300', 'dark:border-slate-700',
            'border-emerald-500', 'dark:border-emerald-500',
            'border-red-500', 'dark:border-red-500'
        );

        if (isValid) {
            input.classList.add('border-emerald-500', 'dark:border-emerald-500');
            if (statusEl) statusEl.innerHTML = ICON_VALID;
            input.setAttribute('aria-invalid', 'false');
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
        } else {
            input.classList.add('border-red-500', 'dark:border-red-500');
            input.setAttribute('aria-invalid', 'true');
            if (statusEl) statusEl.innerHTML = ICON_INVALID;
            errorEl.textContent = errorMsg;
            errorEl.classList.remove('hidden');
        }
    }

    // --- 8. Progression Globale (8/8 champs obligatoires) ---
    function updateFormProgress() {
        const requiredKeys = ['lastName', 'firstName', 'birthDate', 'birthPlace', 'email', 'studyLevel', 'program', 'phone'];
        let validRequiredCount = 0;

        requiredKeys.forEach(key => {
            if (validateField(key, false)) {
                validRequiredCount++;
            }
        });

        const total = requiredKeys.length;
        const percentage = Math.round((validRequiredCount / total) * 100);

        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% complété (${validRequiredCount}/${total} requis)`;

        const isFormReady = validRequiredCount === total;

        if (isFormReady) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('bg-slate-400', 'dark:bg-slate-700', 'cursor-not-allowed');
            submitBtn.classList.add('bg-esgae-blue', 'hover:bg-blue-900', 'cursor-pointer', 'shadow-lg');
            submitBtnText.textContent = 'Valider mon inscription à l’ESGAE';
            submitBtnIcon.classList.remove('hidden');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add('bg-slate-400', 'dark:bg-slate-700', 'cursor-not-allowed');
            submitBtn.classList.remove('bg-esgae-blue', 'hover:bg-blue-900', 'cursor-pointer', 'shadow-lg');
            submitBtnText.textContent = `Complétez les champs obligatoires (${validRequiredCount}/${total})`;
            submitBtnIcon.classList.add('hidden');
        }
    }

    // --- 9. Sauvegarde Automatique ---
    function saveDraft() {
        const draft = {
            lastName: fields.lastName.value,
            firstName: fields.firstName.value,
            birthDate: fields.birthDate.value,
            birthPlace: fields.birthPlace.value,
            email: fields.email.value,
            studyLevel: fields.studyLevel.value,
            program: fields.program.value,
            countryCode: countryCodeSelect.value,
            customDialCode: customDialCodeInput.value,
            phone: fields.phone.value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));

        autosaveBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span><span>Brouillon enregistré</span>`;
        setTimeout(() => {
            autosaveBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span>Brouillon auto-sauvegardé</span>`;
        }, 1200);
    }

    function loadDraft() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        try {
            const draft = JSON.parse(raw);
            if (draft.countryCode) {
                countryCodeSelect.value = draft.countryCode;
                if (draft.countryCode === 'OTHER') {
                    customDialCodeInput.classList.remove('hidden');
                    customDialCodeInput.value = draft.customDialCode || '';
                }
            }
            if (draft.studyLevel) {
                fields.studyLevel.value = draft.studyLevel;
                populateProgramsForLevel(draft.studyLevel, draft.program || '');
            }
            Object.keys(fields).forEach(key => {
                if (draft[key]) {
                    fields[key].value = draft[key];
                    touched[key] = true;
                    validateField(key, true);
                }
            });
            updateFormProgress();
        } catch (e) {
            console.error('Erreur lors de la restauration du brouillon :', e);
        }
    }

    resetDraftBtn.addEventListener('click', () => {
        form.reset();
        customDialCodeInput.classList.add('hidden');
        fields.phone.placeholder = PHONE_PLACEHOLDERS['+242'];
        populateProgramsForLevel('');
        localStorage.removeItem(STORAGE_KEY);
        Object.keys(fields).forEach(key => {
            touched[key] = false;
            const input = fields[key];
            input.classList.remove('border-emerald-500', 'dark:border-emerald-500', 'border-red-500', 'dark:border-red-500');
            input.classList.add('border-slate-300', 'dark:border-slate-700');
            input.removeAttribute('aria-invalid');
            errors[key].textContent = '';
            errors[key].classList.add('hidden');
            if (statuses[key]) statuses[key].innerHTML = '';
        });
        updateFormProgress();
    });

    // --- 10. Écouteurs d'événements sur les champs ---
    Object.keys(fields).forEach(key => {
        const input = fields[key];
        const eventType = input.tagName === 'SELECT' || input.type === 'date' ? 'change' : 'input';

        input.addEventListener(eventType, () => {
            if (key === 'phone') {
                input.value = formatInternationalPhone(input.value, getActiveDialCode());
            }
            if (key === 'lastName') {
                const start = input.selectionStart;
                input.value = input.value.toUpperCase();
                input.setSelectionRange(start, start);
            }
            touched[key] = true;
            validateField(key, true);
            updateFormProgress();
            saveDraft();
        });

        input.addEventListener('blur', () => {
            touched[key] = true;
            validateField(key, true);
            updateFormProgress();
        });
    });

    // --- 11. Soumission & Modales ---
    function formatFrenchDate(isoDate) {
        if (!isoDate) return '';
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let allValid = true;

        Object.keys(fields).forEach(key => {
            touched[key] = true;
            if (!validateField(key, true)) {
                allValid = false;
            }
        });

        if (!allValid) return;

        const fullPhone = `${getActiveDialCode()} ${fields.phone.value.trim()}`;
        const formattedBirth = `${formatFrenchDate(fields.birthDate.value)} à ${fields.birthPlace.value.trim()}`;

        recapBox.innerHTML = `
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-500 dark:text-slate-400">Nom complet :</span>
                <span class="font-bold text-slate-900 dark:text-white">${fields.lastName.value.trim()} ${fields.firstName.value.trim()}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-500 dark:text-slate-400">Naissance :</span>
                <span class="font-semibold text-slate-900 dark:text-white text-right">${formattedBirth}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-500 dark:text-slate-400">E-mail :</span>
                <span class="font-semibold text-slate-900 dark:text-white">${fields.email.value.trim()}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-500 dark:text-slate-400">Cycle :</span>
                <span class="font-semibold text-slate-900 dark:text-white">${LEVEL_LABELS[fields.studyLevel.value]}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span class="text-slate-500 dark:text-slate-400">Filière :</span>
                <span class="font-semibold text-esgae-accent text-right">${fields.program.value}</span>
            </div>
            <div class="flex justify-between py-1">
                <span class="text-slate-500 dark:text-slate-400">Téléphone :</span>
                <span class="font-semibold text-slate-900 dark:text-white">${fullPhone}</span>
            </div>
        `;

        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        localStorage.removeItem(STORAGE_KEY);
    });

    closeSuccessModalBtn.addEventListener('click', () => {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
        resetDraftBtn.click();
    });

    // Modale Comparateur Avant / Après
    function toggleCompareModal(show) {
        if (show) {
            compareModal.classList.remove('hidden');
            compareModal.classList.add('flex');
        } else {
            compareModal.classList.add('hidden');
            compareModal.classList.remove('flex');
        }
    }

    openCompareModalBtn.addEventListener('click', () => toggleCompareModal(true));
    closeCompareModalBtn.addEventListener('click', () => toggleCompareModal(false));
    closeCompareFooterBtn.addEventListener('click', () => toggleCompareModal(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!successModal.classList.contains('hidden')) closeSuccessModalBtn.click();
            if (!compareModal.classList.contains('hidden')) toggleCompareModal(false);
        }
    });

    // --- Initialisation au chargement ---
    initTheme();
    loadDraft();
    updateFormProgress();
});
