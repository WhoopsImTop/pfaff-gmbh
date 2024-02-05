// plugins/gsap-scroll-trigger.client.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// GSAP und ScrollTrigger global verfügbar machen
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
