// Simple helper functions - easy to understand

// Check if a number is prime
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    // Check divisibility up to square root
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Calculate Greatest Common Divisor (GCD)
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Find modular inverse (e × d ≡ 1 mod φ)
function findModularInverse(e, phi) {
    for (let d = 1; d < phi; d++) {
        if ((e * d) % phi === 1) {
            return d;
        }
    }
    return -1; // No inverse found
}

// Simple modular exponentiation (base^exp mod mod)
function modPow(base, exp, mod) {
    let result = 1;
    base = base % mod;
    
    while (exp > 0) {
        // If exp is odd, multiply result with base
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        // Square the base and halve the exponent
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    return result;
}

// Convert letter to number (A=1, B=2, ... Z=26)
function letterToNumber(letter) {
    return letter.charCodeAt(0) - 64; // 'A' is 65 in ASCII
}

// Convert number to letter (1=A, 2=B, ... 26=Z)
function numberToLetter(num) {
    return String.fromCharCode(num + 64);
}

// Global variables to store generated keys
let currentN = 0;
let currentPhi = 0;
let currentE = 0;
let currentD = 0;

// Generate RSA keys from prime numbers
function generateKeys() {
    // Get prime numbers from input
    let p = parseInt(document.getElementById('prime1').value);
    let q = parseInt(document.getElementById('prime2').value);
    
    // Check if both are prime
    let pIsPrime = isPrime(p);
    let qIsPrime = isPrime(q);
    
    // Update status messages
    document.getElementById('prime1Status').innerHTML = pIsPrime ? 
        '✅ Valid prime number' : '❌ Not a prime number';
    document.getElementById('prime1Status').className = pIsPrime ? 
        'text-sm mt-1 text-green-400' : 'text-sm mt-1 text-red-400';
    
    document.getElementById('prime2Status').innerHTML = qIsPrime ? 
        '✅ Valid prime number' : '❌ Not a prime number';
    document.getElementById('prime2Status').className = qIsPrime ? 
        'text-sm mt-1 text-green-400' : 'text-sm mt-1 text-red-400';
    
    // If both are prime, generate keys
    if (pIsPrime && qIsPrime) {
        // Calculate n and phi
        currentN = p * q;
        currentPhi = (p - 1) * (q - 1);
        
        // Display keys
        document.getElementById('keyOutput').style.display = 'block';
        
        // Common e values to try
        let possibleE = [3, 5, 17, 257, 65537];
        let validE = [];
        
        // Find valid e values (must be coprime with phi)
        for (let e of possibleE) {
            if (e < currentPhi && gcd(e, currentPhi) === 1) {
                validE.push(e);
            }
        }
        
        // Update select dropdown
        let select = document.getElementById('publicKeySelect');
        select.innerHTML = '';
        
        if (validE.length > 0) {
            for (let e of validE) {
                let option = document.createElement('option');
                option.value = e;
                option.text = `e = ${e}`;
                option.className = 'text-white';
                select.appendChild(option);
            }
            
            // Set first valid e as current
            currentE = validE[0];
            
            // Calculate private key d
            currentD = findModularInverse(currentE, currentPhi);
            
            // Update display
            document.getElementById('publicKey').innerHTML = `(${currentN}, ${currentE})`;
            document.getElementById('privateKey').innerHTML = `(${currentN}, ${currentD})`;
        } else {
            select.innerHTML = '<option class="text-gray-300">No valid e found</option>';
        }
    }
}

// Handle public key selection change
document.getElementById('publicKeySelect').addEventListener('change', function() {
    if (this.value) {
        currentE = parseInt(this.value);
        currentD = findModularInverse(currentE, currentPhi);
        document.getElementById('publicKey').innerHTML = `(${currentN}, ${currentE})`;
        document.getElementById('privateKey').innerHTML = `(${currentN}, ${currentD})`;
    }
});

// Encrypt message
function encryptMessage() {
    let message = document.getElementById('messageToEncrypt').value.toUpperCase();
    
    if (!message || !currentN) {
        alert('Please generate keys and enter a message first!');
        return;
    }
    
    // Convert message to numbers and encrypt
    let ciphertext = [];
    
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        // Only encrypt letters
        if (char >= 'A' && char <= 'Z') {
            let m = letterToNumber(char);
            // Make sure message < n
            if (m >= currentN) {
                alert(`Letter ${char} (${m}) is too large for current n (${currentN}). Use larger primes.`);
                return;
            }
            let c = modPow(m, currentE, currentN);
            ciphertext.push(c);
        }
    }
    
    // Display result
    document.getElementById('encryptionResult').style.display = 'block';
    document.getElementById('ciphertext').innerHTML = ciphertext.join(', ');
}

// Decrypt message
function decryptMessage() {
    let ciphertextStr = document.getElementById('ciphertextToDecrypt').value;
    let d = parseInt(document.getElementById('privateKeyInput').value);
    let n = parseInt(document.getElementById('modulusForDecrypt').value);
    
    if (!ciphertextStr || !d || !n) {
        alert('Please enter ciphertext, private key (d), and modulus (n)!');
        return;
    }
    
    // Parse ciphertext
    let ciphertext = ciphertextStr.split(',').map(num => parseInt(num.trim()));
    let plaintext = '';
    
    for (let c of ciphertext) {
        let m = modPow(c, d, n);
        if (m >= 1 && m <= 26) {
            plaintext += numberToLetter(m);
        } else {
            plaintext += '?';
        }
    }
    
    // Display result
    document.getElementById('decryptionResult').style.display = 'block';
    document.getElementById('plaintext').innerHTML = plaintext;
}

// Quick fill example values
window.onload = function() {
    // Example values for quick testing
    document.getElementById('prime1').value = 61;
    document.getElementById('prime2').value = 53;
}