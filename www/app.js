document.addEventListener('DOMContentLoaded', function() {
    const correctCodes = {
        '6666': 'Bart',
        '3333': 'Goisa',
        '5555': 'Technische Dienst',
        '7777': 'Kantoor'
    };

    const pinInput = document.getElementById('pin');
    const errorMessage = document.getElementById('error-message');
    let pinValue = '';
    let loggedInUser = '';

    // Navigatie tussen secties, alle secties worden verborgen behalve de doel sectie
    function navigateToSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active'); // Verwijder 'active' van alle secties
            section.classList.add('hidden'); // Verberg alle secties
        });
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.remove('hidden'); // Toon de gewenste sectie
        targetSection.classList.add('active'); // Voeg 'active' toe voor zichtbaarheid
        console.log(`[${new Date().toLocaleTimeString()}] Navigated to section: ${sectionId}`);
    }

    // Toon foutmelding in geval van een onjuiste pincode
    function showErrorMessage(message) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = message;
        pinValue = '';
        pinInput.value = '';
    }

    // Controleer of de ingevoerde pincode correct is
    function checkPin() {
        console.log(`[${new Date().toLocaleTimeString()}] Checking PIN: ${pinValue}`);
        if (correctCodes[pinValue]) {
            console.log(`[${new Date().toLocaleTimeString()}] Correct PIN entered for user: ${correctCodes[pinValue]}`);
            errorMessage.style.display = 'none'; // Verberg foutmelding
            loggedInUser = correctCodes[pinValue];
            document.getElementById('user-display').textContent = `Ingelogd als ${loggedInUser}`;
            navigateToSection('machine-selection-section'); // Navigeer naar machine-selectie bij juiste pincode
            pinValue = '';
            pinInput.value = '';
        } else {
            console.log(`[${new Date().toLocaleTimeString()}] Incorrect PIN entered`);
            showErrorMessage("Onjuiste code. Probeer het opnieuw.");
        }
    }

    // Luister naar klik op de calculator knoppen voor pincode invoer
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', function() {
            if (pinValue.length < 4 && this.dataset.value) {
                pinValue += this.dataset.value;
                pinInput.value = pinValue;
                console.log(`[${new Date().toLocaleTimeString()}] Current PIN: ${pinValue}`);
                if (pinValue.length === 4) {
                    checkPin(); // Controleer de volledige pincode
                }
            }
        });
    });

    // Verwijder het laatste cijfer met de backspace-knop
    document.getElementById('backspace-button').addEventListener('click', function() {
        pinValue = pinValue.slice(0, -1);
        pinInput.value = pinValue;
        console.log(`[${new Date().toLocaleTimeString()}] Backspace clicked. Current PIN: ${pinValue}`);
    });

    // Navigeer naar formulier sectie bij selectie van een machine
    document.querySelectorAll('.machine-button').forEach(button => {
        button.addEventListener('click', function() {
            navigateToSection('form-section'); // Navigeer naar de formulier sectie
        });
    });

    // Navigeer terug naar login bij klik op terug-knop in formulier
    document.getElementById('back-button').addEventListener('click', function() {
        navigateToSection('login-section'); // Navigeer terug naar inlogsectie
        pinValue = '';
        pinInput.value = '';
    });

    // Bevestig het verzenden van het formulier en navigeer naar bevestigingssectie
    document.getElementById('submit-button').addEventListener('click', function() {
        navigateToSection('confirmation-section'); // Navigeer naar bevestigingssectie
    });

    // Navigeer terug naar machine-selectie vanaf bevestigingspagina
    document.getElementById('back-to-machines').addEventListener('click', function() {
        navigateToSection('machine-selection-section'); // Navigeer terug naar de machine selectie
    });

    // Uitlogfunctionaliteit, reset naar inlogsectie
    document.getElementById('logout-button').addEventListener('click', function() {
        navigateToSection('login-section'); // Navigeer terug naar inlogsectie
        loggedInUser = ''; // Reset ingelogde gebruiker
        pinValue = ''; // Reset pincode
        pinInput.value = ''; // Maak pincode veld leeg
        document.getElementById('user-display').textContent = ''; // Wis gebruikerstekst
        errorMessage.style.display = 'none'; // Verberg foutmelding
    });
});

/* 
Wijzigingen en toevoegingen:
- Verbeterde `navigateToSection` functie voor nauwkeurige sectiewisseling.
- `showErrorMessage` toegevoegd voor eenduidige foutmeldingsafhandeling.
- Console logs uitgebreid voor betere debugbaarheid bij pincode-invoer en sectiewisseling.
*/