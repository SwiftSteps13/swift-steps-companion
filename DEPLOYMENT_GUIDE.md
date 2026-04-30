# Swift Steps Companion — Deployment Guide

You don't need to be a developer to do this. Just follow each step in order.

---

## What You'll Have At The End

A real, tappable URL like `swift-steps-companion.vercel.app` that you can text to your beta testers. They can open it on their phones and use it like any other app. The chat will work, the data will save, everything will function.

**Total time:** About 20 minutes the first time. After that, updates take 30 seconds.

**Total cost:** Vercel hosting is free. Anthropic API costs around 1–3 cents per conversation. For five testers each having a few conversations, expect $1–5 total.

---

## Before You Start

You'll need:

1. **A free GitHub account** — sign up at https://github.com if you don't have one
2. **A free Vercel account** — sign up at https://vercel.com (use "Continue with GitHub" — it makes everything easier)
3. **An Anthropic API key** — sign up at https://console.anthropic.com (this is the part with cost — see Step 4)

It's okay to set these up as you go. Just keep this guide open.

---

## Step 1: Get The Code Onto GitHub

GitHub is where the code lives. Vercel will pull from there.

### 1a. Create a new repository

1. Go to https://github.com/new
2. Repository name: `swift-steps-companion`
3. Set it to **Private** (this is your IP — keep it private)
4. Don't check any of the "Initialize" boxes
5. Click "Create repository"

You'll land on a page that says "Quick setup." Keep this tab open. We'll come back to it.

### 1b. Upload the code

The easiest way without using a terminal:

1. On that same GitHub page, click "uploading an existing file" (it's in the gray text area)
2. In a separate window, find the `swift-steps-deploy` folder I gave you on your computer
3. Open the folder
4. Select **all the files inside** (Ctrl+A on Windows, Cmd+A on Mac)
5. **Important:** Make sure you select the files INSIDE the folder, not the folder itself
6. Drag them all onto the GitHub upload page
7. Wait for them to upload (you'll see a list appear)
8. Scroll down and click "Commit changes"

Done with GitHub. The code is now online (privately).

---

## Step 2: Get Your Anthropic API Key

This is the only part with cost, but it's small.

1. Go to https://console.anthropic.com
2. Sign up or log in
3. You may need to add a small amount of credit to your account ($5 minimum is fine — that's enough for hundreds of test conversations)
4. Click **API Keys** in the left sidebar
5. Click **Create Key**
6. Name it `swift-steps-companion`
7. **Copy the key immediately** and paste it somewhere safe (a note on your phone, a password manager). It starts with `sk-ant-` and you only get to see it once.

The key is like a password. Don't share it. Don't put it in screenshots. Don't paste it anywhere public. We're going to put it into Vercel safely in the next step.

---

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. If asked, connect your GitHub account
3. Find `swift-steps-companion` in the list and click **Import**
4. On the configuration screen, you'll see fields for "Framework Preset" and so on. **Don't change anything yet.**
5. Find the section called **Environment Variables**
6. Add a new one:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste the key you copied from Anthropic (starts with `sk-ant-`)
7. Click **Add**
8. Now click **Deploy**

Wait about 60–90 seconds. You'll see a "Congratulations" screen with confetti and a preview of the app.

Click **Continue to Dashboard**, then click on your project. You'll see your URL at the top — it'll look something like `swift-steps-companion-abc123.vercel.app`.

**That's your link. That's what you send your testers.**

---

## Step 4: Test It Yourself First

Before sending the link to anyone, open it on your phone:

1. Tap the link
2. Read through the welcome screen
3. Check the box, tap **Come Sit With Us**
4. Try the chat — say something a member might say like "i blew up at my partner last night and i feel awful"
5. Try a check-in
6. Try the reflect tab
7. Try switching weeks

If something doesn't work, see the **Troubleshooting** section at the bottom.

If everything works, you're ready to share.

---

## Step 5: Optional — Custom Domain

If you want a cleaner URL like `companion.swiftsteps.org` instead of the random Vercel URL, you can add a custom domain. This is optional and not needed for testing.

In Vercel: Project → Settings → Domains. Follow the prompts. You'll need access to your `swiftsteps.org` DNS settings.

---

## Updating The App Later

When we make changes (and we will, after testers give feedback), updates work like this:

1. I'll give you a new version of the code
2. Go to your GitHub repo
3. Click the file you need to update (or "Add file" → "Upload files" for new ones)
4. Drag the new version
5. Commit changes
6. Vercel auto-deploys in about a minute

That's it. No terminal, no commands, no rebuild from scratch.

---

## Troubleshooting

**The site loads but the chat doesn't respond.**
The API key probably isn't set up right. Go to Vercel → your project → Settings → Environment Variables. Make sure `ANTHROPIC_API_KEY` is there and starts with `sk-ant-`. If you fix it, you need to redeploy: Deployments tab → three dots on the latest → Redeploy.

**Vercel says "Build failed."**
Click into the deployment to see the error. Most common cause: a file didn't upload correctly. Re-upload the entire folder contents to GitHub.

**The site loads but looks broken on mobile.**
Take a screenshot and send it to me. There may be a small CSS adjustment needed for specific phone sizes.

**Anthropic says "rate limit" or "credit exhausted."**
You used up your free credits or hit the per-minute limit. Add more credit at console.anthropic.com → Billing.

**Someone's chat is taking forever / spinning.**
Anthropic API can occasionally be slow. If it persists more than 30 seconds, refreshing the page usually fixes it.

---

## What Costs What

| Thing | Cost |
|---|---|
| Vercel hosting (free tier) | $0 |
| GitHub private repo | $0 |
| Anthropic API minimum credit | $5 |
| Per-conversation cost (rough average) | $0.01 – $0.03 |
| 5 testers × 5 conversations each | ~$0.50 – $0.75 |

You can set a usage limit in Anthropic's console so you never get a surprise bill.

---

## What To Send Me If You Get Stuck

Screenshot of the error, the URL of the page you're on, and what you were trying to do. We'll work through it.
