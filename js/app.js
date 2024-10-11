document.addEventListener('DOMContentLoaded', function() {
    // Toegestane pincodecodes en bijbehorende gebruikers
    const correctCodes = {
        '6666': 'Bart',
        '3333': 'Goisa',
        '5555': 'Technische Dienst',
        '7777': 'Kantoor'
    };

    // Event listeners voor de sidebar navigatie knoppen
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            console.log(`Navigeren naar sectie via navigatieknop: ${sectionId}`);
            navigateToSection(sectionId);
        });
    });

    // Variabelen voor DOM-elementen en invoer
    const pinInput = document.getElementById('pin'); // Pincode invoerveld
    const errorMessage = document.getElementById('error-message'); // Foutmelding
    const userDisplay = document.getElementById('user-display'); // Gebruikersnaam weergave op machine-selectie
    const welcomeUser = document.getElementById('welcome-user'); // Welkomsboodschap op de welkomstpagina
    let pinValue = ''; // Variabele om de ingevoerde pincode op te slaan
    let loggedInUser = null; // Variabele om de ingelogde gebruiker op te slaan

    /**
     * Functie om naar een specifieke sectie van de app te navigeren.
     * @param {string} sectionId - De ID van de sectie om te tonen.
     */
    function navigateToSection(sectionId) {
        console.log(`Proberen te navigeren naar sectie: ${sectionId}`);
        
        // Verberg alle secties eerst
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
            console.log(`Sectie ${section.id} verborgen.`);
        });

        // Controleer of de doelsectie bestaat
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            console.log(`Succesvol genavigeerd naar sectie: ${sectionId}`);
        } else {
            console.error(`Sectie met ID '${sectionId}' niet gevonden`);
            alert(`Fout: De sectie '${sectionId}' bestaat niet.`);
        }
    }

    /**
     * Functie om de foutmelding te tonen.
     * @param {string} message - De foutmelding die weergegeven moet worden.
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        console.log(`Foutmelding getoond: ${message}`);
    }

    /**
     * Functie om de foutmelding te verbergen.
     */
    function hideError() {
        errorMessage.style.display = 'none';
        console.log("Foutmelding verborgen");
    }

    /**
     * Event listener voor de bevestigingsknop om de pincode te verifiëren.
     */
    document.getElementById('submit-code').addEventListener('click', function() {
        pinValue = pinInput.value.trim(); // Haal de ingevoerde waarde op en verwijder witruimte

        // Controleer of de pincode tussen 4 en 8 cijfers bevat en correct is
        if (pinValue.length >= 4 && pinValue.length <= 8 && correctCodes[pinValue]) {
            hideError(); // Verberg de foutmelding
            loggedInUser = correctCodes[pinValue]; // Sla de naam van de ingelogde gebruiker op
            welcomeUser.textContent = loggedInUser; // Vul de naam in op de welkomstpagina
            navigateToSection('welcome-section'); // Navigeer naar de welkomstpagina
            pinInput.value = ''; // Reset invoerveld na succesvolle inlog
        } else {
            // Toon foutmelding bij onjuiste invoer
            showError("Ongeldige code. Voer een geldige pincode in (4-8 cijfers).");
            pinInput.value = ''; // Reset invoerveld bij foutieve invoer
        }
    });

    /**
     * Event listener voor de backspace-knop om het laatste ingevoerde cijfer te verwijderen.
     */
    document.getElementById('backspace-button').addEventListener('click', function() {
        pinValue = pinValue.slice(0, -1); // Verwijder het laatste karakter
        pinInput.value = pinValue; // Update het invoerveld
        console.log("Backspace gebruikt, huidige pinValue:", pinValue);
    });

    /**
     * Event listener voor de knop "Doorgaan naar Machine Selectie" op de welkomstpagina.
     */
    document.getElementById('continue-to-machines-button').addEventListener('click', function() {
        userDisplay.textContent = `Ingelogd als ${loggedInUser}`; // Weergave van de gebruiker op de machine-selectie pagina
        navigateToSection('machine-selection-section'); // Navigeer naar de machine-selectie pagina
        console.log("Doorgaan naar Machine Selectie");
    });

    /**
     * Event listener voor de knop "Probleem Melden Verpakking" op de welkomstpagina.
     */
    document.getElementById('report-problem-button').addEventListener('click', function() {
        navigateToSection('report-problem-section'); // Navigeer naar de formulier-pagina voor probleemmelding
        console.log("Navigeren naar Probleem Melden Verpakking");
    });

    /**
     * Event listener voor de uitlogknop. Deze brengt de gebruiker terug naar de inlogpagina.
     */
    document.getElementById('logout-button').addEventListener('click', function() {
        navigateToSection('login-section'); // Ga terug naar de login-sectie
        resetApp(); // Reset alle invoer- en gebruikersinformatie
        console.log("Uitgelogd en terug naar inlogpagina");
    });
    document.addEventListener('DOMContentLoaded', function() {
        // Selecteer het inputveld voor het gewicht
        const productWeightInput = document.getElementById('product-weight');
        const weightError = document.createElement('p');
        weightError.style.color = 'red';
        weightError.style.display = 'none';
        weightError.textContent = "Alleen cijfers en één komma toegestaan.";
        productWeightInput.insertAdjacentElement('afterend', weightError);
    
        // Event listener voor het gewichtveld om alleen cijfers en een komma toe te staan
        productWeightInput.addEventListener('input', function() {
            // Controleer of de waarde voldoet aan het patroon: cijfers en maximaal één komma
            const isValid = /^[0-9]*,?[0-9]*$/.test(productWeightInput.value);
            
            if (!isValid) {
                // Ongeldige invoer: toon foutmelding en markeer veld rood
                productWeightInput.style.borderColor = 'red';
                weightError.style.display = 'block';
            } else {
                // Geldige invoer: herstel standaard stijl
                productWeightInput.style.borderColor = '';
                weightError.style.display = 'none';
            }
        });
    });
    /**
     * Functie om de app te resetten na uitloggen of terugkeren naar de inlogpagina.
     */
    function resetApp() {
        pinValue = ''; // Reset de pincode waarde
        pinInput.value = ''; // Reset het invoerveld
        loggedInUser = null; // Reset de ingelogde gebruiker
        userDisplay.textContent = ''; // Verwijder gebruikersnaam van de display
        welcomeUser.textContent = ''; // Verwijder naam van de welkomstpagina
        hideError(); // Verberg eventuele foutmeldingen
        console.log("Applicatie gereset");
    }

    // **Probleem Melden functionaliteit**
    const productCodeInput = document.getElementById('product-code');
    const photoInput = document.getElementById('product-photo');
    const argumentationInput = document.getElementById('argumentation');
    const solutionRadios = document.getElementsByName('solution');
    const submitProblemButton = document.getElementById('submit-problem');

    // Event listener voor de verzendknop van het formulier
    submitProblemButton.addEventListener('click', function() {
        // Validatie van verplichte velden
        if (!productCodeInput.value.trim()) {
            alert("Productcode is verplicht.");
            return;
        }
        if (!photoInput.files.length) {
            alert("Upload minstens één foto.");
            return;
        }
        if (argumentationInput.value.trim().length < 1) {
            alert("Argumentatie is verplicht.");
            return;
        }

        // Controleer of "Oplossing gevonden?" is geselecteerd en toon pop-ups
        let solutionFound = null;
        for (const radio of solutionRadios) {
            if (radio.checked) {
                solutionFound = radio.value;
                break;
            }
        }
        if (solutionFound === "yes") {
            const solutionComment = prompt("Voer opmerkingen in over de oplossing:");
            if (!solutionComment) {
                alert("Opmerking is verplicht wanneer 'Oplossing gevonden' is geselecteerd.");
                return;
            }
        } else if (solutionFound === "no") {
            alert("Ga naar technische dienst.");
        } else {
            alert("Selecteer 'Oplossing gevonden?' (Ja/Nee).");
            return;
        }

        // Simuleren van het verzenden van de gegevens naar Drive
        alert("Probleem succesvol verzonden naar Drive.");

        // Navigeren naar bevestigingspagina en terug naar login
        navigateToSection('submission-confirmation');
        console.log("Navigeren naar bevestigingspagina");
        setTimeout(() => {
            navigateToSection('login-section');
            console.log("Terug naar inlogpagina na 3 seconden");
        }, 3000);
    });
});