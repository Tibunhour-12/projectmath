// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        html.classList.add('dark');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
});

// Dropdown functionality
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
    dropdownMenu.classList.add('hidden');
});

// ============ CAESAR CIPHER FUNCTIONS ============
function caesarEncrypt() {
    const input = document.getElementById('caesarInput').value;
    if (!input) {
        alert('Please enter text to encrypt!');
        return;
    }
    
    let result = '';
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (char.match(/[a-z]/i)) {
            let code = input.charCodeAt(i);
            // Uppercase letters
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + 3) % 26) + 65);
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + 3) % 26) + 97);
            }
        }
        result += char;
    }
    
    document.getElementById('caesarOutput').textContent = result;
    document.getElementById('caesarResult').style.display = 'block';
}

function caesarDecrypt() {
    const input = document.getElementById('caesarInput').value;
    if (!input) {
        alert('Please enter text to decrypt!');
        return;
    }
    
    let result = '';
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (char.match(/[a-z]/i)) {
            let code = input.charCodeAt(i);
            // Uppercase letters
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 - 3 + 26) % 26) + 65);
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 - 3 + 26) % 26) + 97);
            }
        }
        result += char;
    }
    
    document.getElementById('caesarOutput').textContent = result;
    document.getElementById('caesarResult').style.display = 'block';
}


// ============ GENERAL SHIFT CIPHER FUNCTIONS - UNLIMITED KEY ============
function shiftEncrypt() {
    const input = document.getElementById('shiftInput').value;
    const key = parseInt(document.getElementById('shiftKey').value);
    
    if (!input) {
        alert('Please enter text to encrypt!');
        return;
    }
    
    if (isNaN(key)) {
        alert('Please enter a valid integer key!');
        return;
    }
    
    // Normalize the key to handle negative and large values
    // This ensures we work within 0-25 range for the alphabet
    const normalizedKey = ((key % 26) + 26) % 26; // Always gives 0-25
    
    let result = '';
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (char.match(/[a-z]/i)) {
            let code = input.charCodeAt(i);
            // Uppercase letters (A-Z: 65-90)
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + normalizedKey) % 26) + 65);
            }
            // Lowercase letters (a-z: 97-122)
            else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + normalizedKey) % 26) + 97);
            }
        }
        result += char;
    }
    
    document.getElementById('shiftOutput').textContent = result;
    document.getElementById('shiftKeyInfo').textContent = `Used key: ${key} (normalized to ${normalizedKey} for alphabet)`;
    document.getElementById('shiftResult').style.display = 'block';
}

function shiftDecrypt() {
    const input = document.getElementById('shiftInput').value;
    const key = parseInt(document.getElementById('shiftKey').value);
    
    if (!input) {
        alert('Please enter text to decrypt!');
        return;
    }
    
    if (isNaN(key)) {
        alert('Please enter a valid integer key!');
        return;
    }
    
    // For decryption, we subtract the key
    // Normalize to handle negative and large values
    const normalizedKey = ((-key % 26) + 26) % 26; // Always gives 0-25
    
    let result = '';
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (char.match(/[a-z]/i)) {
            let code = input.charCodeAt(i);
            // Uppercase letters
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + normalizedKey) % 26) + 65);
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + normalizedKey) % 26) + 97);
            }
        }
        result += char;
    }
    
    document.getElementById('shiftOutput').textContent = result;
    document.getElementById('shiftKeyInfo').textContent = `Used key: ${key} (normalized to ${(26 - normalizedKey) % 26} for decryption)`;
    document.getElementById('shiftResult').style.display = 'block';
}