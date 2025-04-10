# What is? 

This is the Front-end of project "webview-documents". The project allows the user to get a MDX document from your backend and show it on the browser. Simple, no? 
The project also has a backend at [webview-mdx-docs-backend](https://github.com/Zafkiel45/webview-mdx-docs-backend). You can install both, and run your machine to the 
full experience. 

## Getting Started

The Front-end uses Next.js as framework, and some another dependencies to convert markdown to HTML. In addition, JSX is also converted to HTML. After to install the project, run the commands below: 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Security caveats:

This project uses [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote). This package allows to get a MDX from backend, convert it correctly and renderize on the browser using Next.js.

The problem is: MDX allows JSX too... JSX allow the execution of JavaScript. Because of this, you must trust on the backend you will get the docs. The docs can contain malicious code. The best way to use is create your own backend and management it yourself. In addition, you should create your own MDX notes too. NEVER GETS MDX NOTES FROM SUSPECT ORIGINS. 

## Legal advices:

**Warning:** This project allows the use of `.mdx` files, which combine Markdown with JSX components. Although the project provides good practice guidelines and recommended security measures, improper or negligent use may result in security flaws such as **XSS (Cross-Site Scripting) or malicious code execution.**

**The author accepts no liability for any damage, injury or loss arising from incorrect use of this software, especially in production environments.** The user is entirely responsible for **validating, sanitizing and auditing any dynamic content used through this system.**

It is the user's responsibility to ensure that `.mdx` files come from reliable sources and comply with the security practices described in the documentation.

# How to use?  

Now, you have the project installed on your machine, start the backend before to start the front-end. The motivation is: The Front-end will fetch the name of folders where your mdx notes are and show it on navbar. This is as the tag of notes. 

After, when you click some item of navbar, all notes related the folder's name, it will be showed. Now, it's only navegate between your notes using the project. 

# The documentation 

This docs still in progress. There are many thing about it, but, the first release of project `v1.0.0` is not the final version, and there is nothing instead of read your notes for now. 
