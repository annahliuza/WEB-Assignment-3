/**
 * Task: Rule 1 - Length verification condition check
 */
function runRuleOne(pwd) {
    return pwd.length >= 5;
}

/**
 * Task: Rule 2 - Checking if a numeric digit exists
 */
function runRuleTwo(pwd) {
    return /\d/.test(pwd);
}

/**
 * Task: Rule 3 - Checking if an uppercase letter exists
 */
function runRuleThree(pwd) {
    return /[A-Z]/.test(pwd);
}

/**
 * Task: Rule 4 - Checking if a special character exists
 */
function runRuleFour(pwd) {
    return /[^a-zA-Z0-9]/.test(pwd);
}

/**
 * Task: Rule 5 - Calculating if the string digits total 25
 */
function runRuleFive(pwd) {
    const digits = pwd.match(/\d/g) || [];
    const sum = digits.reduce((accumulator, current) => accumulator + Number(current), 0);
    return sum === 25;
}

/**
 * Helper function for rule 8 to convert a Roman Numeral character to its numeric value
 */
function getRomanValueForRuleEight(char) {
    if (char === 'I') return 1;
    if (char === 'V') return 5;
    if (char === 'X') return 10;
    if (char === 'L') return 50;
    if (char === 'C') return 100;
    if (char === 'D') return 500;
    if (char === 'M') return 1000;
    return 0;
}

/**
 * Task: Rule 8 - The Roman numerals in your password should multiply to 35
 */
function runRuleEight(pwd) {
    var matches = pwd.match(/[IVXLCDM]+/g);
    if (!matches) return false;

    var totalProduct = 1;
    var foundAny = false;

    for (var i = 0; i < matches.length; i++) {
        var romanStr = matches[i];
        var numericVal = 0;
        
        for (var j = 0; j < romanStr.length; j++) {
            var current = getRomanValueForRuleEight(romanStr[j]);
            var next = getRomanValueForRuleEight(romanStr[j + 1]);
            if (next && current < next) {
                numericVal -= current;
            } else {
                numericVal += current;
            }
        }
        
        if (numericVal > 0) {
            totalProduct *= numericVal;
            foundAny = true;
        }
    }

    return foundAny && (totalProduct === 35);
}

/**
 * Task: Rule 9 - Your password must include the next line of code needed for this program (simple HTML)
 */
function runRuleNine(pwd) {
    var hasDiv = pwd.indexOf("<div>") !== -1 || pwd.indexOf("</div>") !== -1;
    var hasP = pwd.indexOf("<p>") !== -1 || pwd.indexOf("</p>") !== -1;
    var hasSpan = pwd.indexOf("<span>") !== -1 || pwd.indexOf("</span>") !== -1;
    return hasDiv || hasP || hasSpan;
}

/**
 * Task: Rule 20 - Checking if the length is contained in the string
 */
function runRuleTwenty(pwd) {
    const len = String(pwd.length);
    return pwd.includes(len);
}

/**
 * Task: Rule 21 - Checking if the string digits total the string length
 */
function runRuleTwentyOne(pwd) {
    const digits = pwd.match(/\d/g) || [];
    const sum = digits.reduce((accumulator, current) => accumulator + Number(current), 0);
    return sum === pwd.length;
}

/**
 * Task: Rule 22 - Your password should include Allan's favourite exercise all lowercase letters (Hint: Session 14)
 */
function runRuleTwentyTwo(pwd) {
    var lowerPwd = pwd.toLowerCase();
    return lowerPwd.indexOf("mydate") !== -1;
}

/**
 * Task: Rule 23 - Password must contain a palindrome (at least 3 characters long)
 */
function runRuleTwentyThree(pwd) {
    var lowerPwd = pwd.toLowerCase();
    var length = lowerPwd.length;

    for (var i = 0; i < length; i++) {
        for (var j = i + 3; j <= length; j++) {
            var sub = lowerPwd.substring(i, j);
            var reversed = "";
            for (var k = sub.length - 1; k >= 0; k--) {
                reversed += sub[k];
            }
            if (sub === reversed) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Task: Live Input Tracker, DOM Generation, and localStorage Saves
 */

// Centralised Array mapping our 25 rules
const rulesList = [
    { id: 1, description: "Your password must be at least 5 characters long.", check: runRuleOne },
    { id: 2, description: "Your password must include a number.", check: runRuleTwo },
    { id: 3, description: "Your password must include an uppercase letter.", check: runRuleThree },
    { id: 4, description: "Your password must include a special character.", check: runRuleFour },
    { id: 5, description: "The digits in your password must add up to exactly 25.", check: runRuleFive },
    { id: 8, description: "The Roman numerals in your password should multiply to 35.", check: runRuleEight },
    { id: 9, description: "Your password must include the next line of code needed for this program (simple HTML).", check: runRuleNine },
    { id: 20, description: "Your password must include the total password length.", check: runRuleTwenty },
    { id: 21, description: "The digits in your password must add up to the total password length.", check: runRuleTwentyOne },
    { id: 22, description: "Your password should include Allan's favourite exercise, all lowercase letters.", check: runRuleTwentyTwo },
    { id: 23, description: "Your password must contain a palindrome (at least 3 characters).", check: runRuleTwentyThree }

];

const passwordInput = document.getElementById("password-input");
const charCount = document.getElementById("char-count");
const rulesContainer = document.getElementById("rules-container");
const statsBanner = document.getElementById("stats-banner");

// Read and restore score milestone tracking metrics on start
let personalBest = localStorage.getItem("via_unstyled_score") || 0;
statsBanner.innerText = `Personal Best: Unlocked ${personalBest} Rules`;

function processPasswordGameLoop() {
    const password = passwordInput.value;
    charCount.innerText = password.length;
    rulesContainer.innerHTML = ""; // Clear existing rule lists

    let currentScore = 0;
    let stopPipeline = false;

    for (let i = 0; i < rulesList.length; i++) {
        if (stopPipeline) break;

        const rule = rulesList[i];
        const isPassed = rule.check(password);

        // Build standard unstyled block components cleanly via native DOM API
        const ruleParagraph = document.createElement("p");
        
        // Use clean text marks instead of CSS colors to display status
        const statusLabel = isPassed ? "[VALID] " : "[INVALID] ";
        ruleParagraph.innerText = `${statusLabel} Rule ${rule.id}: ${rule.description}`;

        rulesContainer.appendChild(ruleParagraph);

        if (isPassed) {
            currentScore++;
        } else {
            stopPipeline = true; // Stop here so subsequent locked rules don't render
        }
    }

    // Save peak milestone records down into browser's local cache
    if (currentScore > personalBest) {
        personalBest = currentScore;
        localStorage.setItem("via_unstyled_score", personalBest);
        statsBanner.innerText = `Personal Best: Unlocked ${personalBest} Rules`;
    }
}

// Map event binding handles
passwordInput.addEventListener("input", processPasswordGameLoop);

// Execution trigger to initialize the application interface loop
processPasswordGameLoop();
