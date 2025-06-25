import "./components.css"
import { Link, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { marked } from "marked";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';


export function AboutCard() {
    return (
        <div className="about-card">
            Welcome to InFocus!
            My name is Will Dougherty, and I'm a software engineer based in Boston, MA.
            This website is intended to be a place where I can showcase my work and personal projects.
            <br /><br />Full-scale projects can be found in the Projects section, and shorter pieces of work are in the Writeups section.
            The site is called InFocus because I always aim to present my ideas with clarity and attention to detail- in other words, in focus.
            <br /><br />I've linked my GitHub and LinkedIn below- feel free to check them out, and reach out to me with any questions.
        </div>
    );
}

export function ProjectCards() {
    return (
        <div className="card-section">
            <Link to="/viewer/CheckersEngine.md" className="card writeup">
                A Checkers Engine
            </Link>
        </div>
    );
}

export function WriteupCards() {
    return (
        <main className="card-section">
            <Link to="/viewer/BB84.md" className="card writeup">
                BB84: Shor's Kryptonite?
            </Link>
        </main>
    );
}

export function MarkdownCard({ filename }) {
    const [content, setContent] = useState("Loading...");       // hook to hold data

    useEffect(() => {
        // set the options for code embedded in md
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        })

        // fetch the file
        fetch(`/${filename}`)
            // part 1 of fetch:
            // take the raw text from the .md file
            .then((res) => {
                if (!res.ok) {
                    throw new Erorr('Poor Network Response');
                }
                return res.text();
            })
            // part 2 of fetch:
            // convert md to text and highlight embedded code
            .then((md) => {
                setContent(marked.parse(md));
                hljs.highlightAll();
            })
            .catch((err) => {
                console.error(err);
                setContent("Failed to Load File");
            });
    });

    return (
        <div className="markdown-card" >
            <div className="back-arrow" onClick={() => window.history.back()}>←Back</div>
            <div id="markdown-content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    );
}