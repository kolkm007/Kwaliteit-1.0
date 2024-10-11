document.addEventListener('DOMContentLoaded', function() {
    // Toegestane pincodecodes en gebruikers
    const correctCodes = {
        '6666': 'Bart',
        '3333': 'Goisa',
        '5555': 'Technische Dienst',
        '7777': 'Kantoor'
    };

    // Variabelen voor pincode en foutmeldingen
    const pinInput = document.getElementById('pin');
    const errorMessage = document.getElementById('error-message');
    let pinValue = '';
    let loggedInUser = '';

    /**
     * Functie om naar een specifieke sectie van de app te navigeren
     */
    function navigateToSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }

    // Calculator-knoppen event listeners
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', function() {
            if (pinValue.length < 4 && this.dataset.value) {
                pinValue += this.dataset.value;
                pinInput.value = pinValue;

                // Controleer of de pincode 4 cijfers bevat
                if (pinValue.length === 4) {
                    if (correctCodes[pinValue]) {
                        errorMessage.style.display = 'none';
                        loggedInUser = correctCodes[pinValue];
                        document.getElementById('user-display').textContent = `Ingelogd als ${loggedInUser}`;
                        navigateToSection('machine-selection-section');
                        pinValue = ''; // Reset pincode
                        pinInput.value = '';
                    } else {
                        errorMessage.style.display = 'block';
                        pinValue = '';
                        pinInput.value = '';
                    }
                }
            }
        });
    });

    // Backspace-knop
    document.getElementById('backspace-button').addEventListener('click', function() {
        pinValue = pinValue.slice(0, -1);
        pinInput.value = pinValue;
    });

    // Machine-selectie knop
    document.querySelectorAll('.machine-button').forEach(button => {
        button.addEventListener('click', function() {
            navigateToSection('form-section');
        });
    });

    // Terug naar login knop
    document.getElementById('back-to-login').addEventListener('click', function() {
        navigateToSection('login-section');
        pinValue = '';
        pinInput.value = '';
        errorMessage.style.display = 'none';
    });

    // Formulier verzenden knop
    document.getElementById('submit-button').addEventListener('click', function() {
        navigateToSection('confirmation-section');
    });

    // Terug naar machine selectie knop
    document.getElementById('back-to-machines-confirm').addEventListener('click', function() {
        navigateToSection('machine-selection-section');
    });

    // Uitloggen knop
    document.getElementById('logout-button').addEventListener('click', function() {
        navigateToSection('login-section');
        loggedInUser = '';
        pinValue = '';
        pinInput.value = '';
        document.getElementById('user-display').textContent = '';
        errorMessage.style.display = 'none';
    });
});
