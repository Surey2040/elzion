import { useEffect } from 'react';

// Scroll / timer animations for the case studies, ported 1:1 from the original homepage script
// (chrono journey, rotating Jothi screens, mobile project reel, client feedback, retail shutter, retail screens).
// Everything is scoped to the given root and fully cleaned up on unmount.

const JOTHI_SCREENS = [1, 2, 3, 4, 6, 7, 8].map((n) => `/assets/projects/jothi/screen-${n}.jpg`);
const RETAIL_SCREEN_COUNT = 20;
const clamp01 = (v) => Math.max(0, Math.min(1, v));

export default function useCaseStudyMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];
    const timeouts = new Set();
    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timeouts.delete(id);
        fn();
      }, ms);
      timeouts.add(id);
    };

    // Runs draw() now and once per animation frame while the page scrolls or resizes.
    function driveOnScroll(draw) {
      let frame = 0;
      const run = () => {
        frame = 0;
        draw();
      };
      const request = () => {
        if (!frame) frame = requestAnimationFrame(run);
      };
      addEventListener('scroll', request, { passive: true });
      addEventListener('resize', request, { passive: true });
      cleanups.push(() => {
        removeEventListener('scroll', request);
        removeEventListener('resize', request);
        cancelAnimationFrame(frame);
      });
      draw();
    }

    // Calls onShow when the element is on screen and onHide when it leaves.
    function whileVisible(el, threshold, onShow, onHide) {
      const observer = new IntersectionObserver(
        (entries) => (entries[0].isIntersecting ? onShow() : onHide()),
        { threshold }
      );
      observer.observe(el);
      cleanups.push(() => {
        observer.disconnect();
        onHide();
      });
    }

    // ---- Red-card journey: scroll progress drives the card warp, flip and the project reveal ----
    const chrono = root.querySelector('.chrono-journey');
    if (chrono) {
      const cards = chrono.querySelector('.chrono-cards');
      driveOnScroll(() => {
        const rect = chrono.getBoundingClientRect();
        const travel = Math.max(1, chrono.offsetHeight - innerHeight);
        const p = clamp01(-rect.top / travel);
        const warp = clamp01((p - 0.36) / 0.64);
        const flip = clamp01((p - 0.38) / 0.34);
        const cardsOut = 1 - clamp01((p - 0.66) / 0.14);
        chrono.style.setProperty('--chrono-p', p.toFixed(4));
        chrono.style.setProperty('--chrono-warp', warp.toFixed(4));
        chrono.style.setProperty('--chrono-flip', flip.toFixed(4));
        // the cards are on screen from the moment the section appears; they only fade out once the project opens
        if (cards) cards.style.opacity = cardsOut.toFixed(4);
      });

      // ---- The two phones in the journey cycle through the Jothi screens ----
      const phoneScreens = [...chrono.querySelectorAll('.chrono-phone-screen')];
      if (phoneScreens.length && !reduced) {
        JOTHI_SCREENS.forEach((src) => {
          new Image().src = src;
        });
        let step = 0;
        let timer = 0;
        const change = (image, index) => {
          image.classList.add('is-switching');
          later(() => {
            image.src = JOTHI_SCREENS[index];
            image.alt = `Jothi Vel Chits app screen ${index + 1}`;
            requestAnimationFrame(() => requestAnimationFrame(() => image.classList.remove('is-switching')));
          }, 240);
        };
        const advance = () => {
          step = (step + 1) % JOTHI_SCREENS.length;
          phoneScreens.forEach((image, i) => change(image, (step + i * 2) % JOTHI_SCREENS.length));
        };
        whileVisible(
          chrono,
          0.15,
          () => {
            if (!timer) timer = setInterval(advance, 2600);
          },
          () => {
            clearInterval(timer);
            timer = 0;
          }
        );
      }
    }

    // ---- Mobile project reel ----
    const reel = root.querySelector('.mobile-project-reel');
    const reelStage = root.querySelector('.mobile-project-stage');
    if (reel && reelStage) {
      driveOnScroll(() => {
        const rect = reel.getBoundingClientRect();
        const travel = Math.max(1, reel.offsetHeight - innerHeight);
        reelStage.style.setProperty('--mobile-project-p', clamp01(-rect.top / travel).toFixed(4));
      });
    }

    // ---- Client feedback fades in once ----
    const feedback = root.querySelector('.client-feedback');
    if (feedback) {
      if (reduced) {
        feedback.classList.add('is-inview');
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) feedback.classList.add('is-inview');
          },
          { threshold: 0.16 }
        );
        observer.observe(feedback);
        cleanups.push(() => observer.disconnect());
      }
    }

    // ---- Retail shutter: the top and bottom halves slide open as you scroll ----
    const shutter = root.querySelector('.retail-transition');
    const shutterSticky = shutter?.querySelector('.retail-transition-sticky');
    if (shutter && shutterSticky && !reduced) {
      driveOnScroll(() => {
        const rect = shutter.getBoundingClientRect();
        const travel = Math.max(1, shutter.offsetHeight - innerHeight);
        const p = clamp01(-rect.top / travel);
        const open = clamp01((p - 0.08) / 0.72);
        shutterSticky.style.setProperty('--retail-top', `${-open * 102}%`);
        shutterSticky.style.setProperty('--retail-bottom', `${open * 102}%`);
        shutterSticky.style.setProperty('--retail-core-scale', (0.7 + open * 0.3).toFixed(3));
        shutterSticky.style.setProperty('--retail-core-opacity', Math.min(1, open * 2).toFixed(3));
      });
    }

    // ---- Retail hero phones keep rotating through the 20 app screens ----
    const retailScreens = [...root.querySelectorAll('[data-retail-rotator] .retail-phone>span>img')];
    const retailCase = root.querySelector('.retail-case');
    if (retailScreens.length && retailCase && !reduced) {
      let index = 0;
      let timer = 0;
      const advance = () => {
        index = (index + 1) % RETAIL_SCREEN_COUNT;
        retailScreens.forEach((image, i) => {
          image.classList.add('switching');
          const next = ((index + i * 7) % RETAIL_SCREEN_COUNT) + 1;
          later(() => {
            image.src = `/assets/projects/namba/screen-${String(next).padStart(2, '0')}.jpg`;
            image.classList.remove('switching');
          }, 180 + i * 70);
        });
      };
      whileVisible(
        retailCase,
        0.08,
        () => {
          if (!timer) timer = setInterval(advance, 1900);
        },
        () => {
          clearInterval(timer);
          timer = 0;
        }
      );
    }

    return () => {
      cleanups.forEach((fn) => fn());
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
    };
  }, [rootRef]);
}
