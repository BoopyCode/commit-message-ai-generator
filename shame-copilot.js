#!/usr/bin/env node

// GitHub Copilot for Your Shame
// Because 'fix stuff' is the archaeological equivalent of 'here be dragons'

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// The Hall of Shame - commit messages that make future you cry
const SHAME_EXAMPLES = [
    "fix stuff",
    "update",
    "asdf",
    "more changes",
    "wip",
    "temp",
    "oops",
    "please work",
    "idk",
    "commit message goes here" // The most honest one
];

// Actually helpful examples - what adults write
const GOOD_EXAMPLES = [
    "fix: resolve null pointer in user authentication",
    "feat: add dark mode toggle to settings page",
    "docs: update API endpoint documentation",
    "refactor: simplify payment validation logic",
    "test: add unit tests for email sanitizer"
];

function checkCommitMessage() {
    try {
        // Get the last commit message
        const msg = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
        
        // Check if it's shameful
        const isShameful = SHAME_EXAMPLES.some(shame => 
            msg.toLowerCase().includes(shame.toLowerCase())
        );
        
        if (isShameful) {
            console.log('\x1b[31m%s\x1b[0m', '🚨 SHAME DETECTED! 🚨');
            console.log(`Your commit: "${msg}"`);
            console.log('\x1b[33m%s\x1b[0m', '\nFuture archaeologists will weep. Try something like:');
            
            // Show a random good example
            const goodExample = GOOD_EXAMPLES[Math.floor(Math.random() * GOOD_EXAMPLES.length)];
            console.log('\x1b[32m%s\x1b[0m', `  ${goodExample}`);
            
            // Optional: Actually help them fix it
            console.log('\x1b[36m%s\x1b[0m', '\nTo amend: git commit --amend -m "your better message"');
            return 1; // Exit with error
        } else {
            console.log('\x1b[32m%s\x1b[0m', '✅ Commit message acceptable. Future you says thanks!');
            return 0;
        }
    } catch (error) {
        console.log('\x1b[33m%s\x1b[0m', '⚠️  Not a git repo or other error. No shame today!');
        return 0;
    }
}

// Run as pre-commit hook or standalone
if (require.main === module) {
    process.exit(checkCommitMessage());
}

module.exports = { checkCommitMessage };