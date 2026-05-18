/* OffGrid — early-paint theme switcher.
   Loaded synchronously from <head> in app/layout.tsx so first paint
   matches the OS preference. No flash, no toggle, no user choice
   stored — we simply mirror `prefers-color-scheme`.
   Cross-browser:
     · Evergreen: window.matchMedia + addEventListener
     · Safari < 14: addListener fallback
     · matchMedia absent / errors: defaults to dark mode
*/
(function () {
  try {
    var doc = document.documentElement;
    var mql =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: light)");

    function apply(prefersLight) {
      doc.setAttribute("data-theme", prefersLight ? "light" : "dark");
    }

    apply(!!(mql && mql.matches));

    if (mql) {
      var onChange = function (e) {
        apply(!!e.matches);
      };
      if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", onChange);
      } else if (typeof mql.addListener === "function") {
        mql.addListener(onChange);
      }
    }
  } catch (err) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
