# Swift Steps Companion — Beta Test Package

Everything you need to deploy the Swift Steps Companion prototype and run a focused feedback round with five trusted Swift Steps members.

## What's In This Folder

```
swift-steps-deploy/
├── DEPLOYMENT_GUIDE.md          ← Start here. Step-by-step deploy instructions.
├── TESTER_MESSAGE.md            ← The message to send each tester.
├── FEEDBACK_FORM_QUESTIONS.md   ← Questions to put in your Google Form.
├── README.md                    ← This file.
│
├── package.json                 ← Project dependencies (don't touch)
├── vite.config.js               ← Build configuration (don't touch)
├── vercel.json                  ← Vercel configuration (don't touch)
├── index.html                   ← App entry point (don't touch)
│
├── api/
│   └── chat.js                  ← Server function that talks to Anthropic
│
└── src/
    ├── App.jsx                  ← The full app code
    ├── main.jsx                 ← React mounting point
    └── index.css                ← Base styles
```

## The Order To Do Things In

1. **Read DEPLOYMENT_GUIDE.md from top to bottom** before doing anything. It will tell you what accounts you need and what to expect.
2. **Deploy to Vercel** (steps 1-3 in the deployment guide). This gets you a real URL.
3. **Test the URL on your own phone.** Make sure everything works before sending to anyone.
4. **Set up the Google Form** using the questions in FEEDBACK_FORM_QUESTIONS.md.
5. **Pick your five testers.** Active members who've been around a while.
6. **Send the message in TESTER_MESSAGE.md** individually to each one. Personalize the opening line.
7. **Wait.** Don't rush them. Don't watch responses come in like a hawk.
8. **Once all five have responded,** read everything in one sitting and look for patterns.
9. **Come back to me with the patterns** and we'll plan the next iteration.

## What This Test Is For

You are NOT testing whether the app is good. You're testing:

- Does the companion actually sound like you?
- Would real members actually use it?
- What's missing that they need?
- What's there that they don't need?

A successful test reveals problems you don't currently know about. Polite "this is great!" responses are the failure mode, not the goal.

## What This Test Is NOT For

- Showcasing the app to drum up excitement (that comes later)
- Recruiting paid members (this is research, not marketing)
- Testing every possible feature (you can only learn so much from five people in one round)

Stay focused. One round, five people, real feedback.
