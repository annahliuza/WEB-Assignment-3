// ========================================================
// 👤 TEAMMATES 1-3: SEPARATE PASSWORD VALIDATION WORKSPACES
// ========================================================

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
 * Task: Rule 3 - Calculating if the string digits total 25
 */
function runRuleFive(pwd) {
    const digits = pwd.match(/\d/g) || [];
    const sum = digits.reduce((accumulator, current) => accumulator + Number(current), 0);
    return sum === 25;
}


// ========================================================
// 👤 TEAMMATE 5: CORE ENGINE & LOCAL STORAGE ENGINE
// ========================================================

/**
 * Task: Live Input Tracker, DOM Generation, and localStorage Saves
 */

// Centralised Array mapping our 5 rules
const rulesList = [
    { id: 1, description: "Your password must be at least 5 characters long.", check: runRuleOne },
    { id: 2, description: "Your password must include a number.", check: runRuleTwo },
    { id: 3, description: "Your password must include an uppercase letter.", check: runRuleThree },
    { id: 4, description: "Your password must include a special character.", check: runRuleFour },
    { id: 5, description: "The digits in your password must add up to exactly 25.", check: runRuleFive }
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
