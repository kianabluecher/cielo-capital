/* CIELO CAPITAL — Blog view (daily news + prediction summaries).
   Kept out of app.js so the daily DATA replacement never touches it.
   Routes: #blog (index) and #blog/<slug> (single post). */
(function () {
  "use strict";

  var INDEX_URL = "./blog/index.json";
  var POST_URL = function (slug) { return "./blog/posts/" + encodeURIComponent(slug) + ".json"; };
  var cache = { index: null, posts: {} };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function safeUrl(u) {
    return /^https?:\/\//i.test(u || "") ? u : "";
  }

  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00Z");
    if (isNaN(d)) return esc(iso);
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  }

  function tone(value) {
    var v = String(value || "").toUpperCase();
    if (/BULL|HIT|LONG|BUY/.test(v)) return "up";
    if (/BEAR|MISS|SHORT|SELL|FEAR|CRITICAL/.test(v)) return "down";
    return "flat";
  }

  function changeTone(change) {
    var s = String(change || "").trim();
    if (s.charAt(0) === "+") return "up";
    if (s.charAt(0) === "-") return "down";
    return "flat";
  }

  function getJSON(url) {
    return fetch(url, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(r.status + " " + url);
      return r.json();
    });
  }

  function loadIndex() {
    if (cache.index) return Promise.resolve(cache.index);
    return getJSON(INDEX_URL).then(function (idx) { cache.index = idx; return idx; });
  }

  function loadPost(slug) {
    if (cache.posts[slug]) return Promise.resolve(cache.posts[slug]);
    return getJSON(POST_URL(slug)).then(function (p) { cache.posts[slug] = p; return p; });
  }

  // ---------------------------------------------------------------- views

  function renderIndex(root, idx) {
    var posts = (idx && idx.posts) || [];
    if (!posts.length) {
      root.innerHTML = '<div class="blog-empty">No posts yet. The first daily brief publishes after the next scheduled run.</div>';
      return;
    }
    var latest = posts[0];
    var rest = posts.slice(1);
    var html = "";

    html += '<a class="blog-feature" href="#blog/' + esc(latest.slug) + '">' +
      '<div class="blog-meta"><span class="blog-tag">LATEST</span><span>' + fmtDate(latest.date) + '</span>' +
      '<span class="blog-pill ' + tone(latest.direction) + '">' + esc(latest.direction || latest.sentiment) + '</span></div>' +
      '<h2>' + esc(latest.title) + '</h2>' +
      '<p>' + esc(latest.excerpt) + '</p>' +
      '<span class="blog-readmore">Read the brief &rarr;</span></a>';

    if (rest.length) {
      html += '<div class="blog-list-label">Archive</div><div class="blog-list">';
      rest.forEach(function (p) {
        html += '<a class="blog-card" href="#blog/' + esc(p.slug) + '">' +
          '<div class="blog-meta"><span>' + fmtDate(p.date) + '</span>' +
          '<span class="blog-pill ' + tone(p.direction) + '">' + esc(p.direction || p.sentiment) + '</span></div>' +
          '<h3>' + esc(p.title) + '</h3><p>' + esc(p.excerpt) + '</p></a>';
      });
      html += "</div>";
    }
    root.innerHTML = html;
  }

  function section(title, body) {
    return body ? '<section class="blog-section"><h3 class="blog-section-title">' + title + '</h3>' + body + '</section>' : "";
  }

  function renderPost(root, p) {
    var pr = p.predictions || {};
    var t = p.trade_idea || {};
    var sc = p.scorecard || {};
    var html = '<a class="blog-back" href="#blog">&larr; All posts</a>';

    html += '<header class="blog-post-header">' +
      '<div class="blog-meta"><span>' + fmtDate(p.date) + '</span>' +
      '<span class="blog-pill ' + tone(p.sentiment) + '">' + esc(p.sentiment) + '</span>' +
      (p.generated_by === "template" ? '<span class="blog-tag">DASHBOARD SNAPSHOT</span>' : '') + '</div>' +
      '<h1>' + esc(p.title) + '</h1><p class="blog-lede">' + esc(p.excerpt) + '</p></header>';

    if (p.snapshot && p.snapshot.length) {
      html += '<div class="blog-snapshot">' + p.snapshot.map(function (s) {
        return '<div class="blog-stat"><div class="blog-stat-label">' + esc(s.label) + '</div>' +
          '<div class="blog-stat-value">' + esc(s.value) + '</div>' +
          '<div class="blog-stat-change ' + changeTone(s.change) + '">' + esc(s.change) + '</div></div>';
      }).join("") + '</div>';
    }

    if (sc.previous_call && sc.outcome !== "N/A") {
      html += section("Yesterday's call",
        '<div class="blog-scorecard"><span class="blog-pill ' + tone(sc.outcome) + '">' + esc(sc.outcome) + '</span>' +
        '<div><strong>' + esc(sc.previous_call) + '</strong><p>' + esc(sc.notes) + '</p></div></div>');
    }

    if (p.news && p.news.length) {
      html += section("Today's news", '<ol class="blog-news">' + p.news.map(function (n) {
        var url = safeUrl(n.source_url);
        return '<li><div class="blog-news-head"><span class="blog-pill ' + tone(n.impact) + '">' + esc(n.impact) + '</span>' +
          '<strong>' + esc(n.headline) + '</strong></div><p>' + esc(n.detail) +
          (url ? ' <a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">Source</a>' : '') + '</p></li>';
      }).join("") + '</ol>');
    }

    html += section("Prediction summary &mdash; " + esc(pr.horizon || "1-3 days"),
      '<div class="blog-prediction"><div class="blog-meta">' +
      '<span class="blog-pill ' + tone(pr.direction) + '">' + esc(pr.direction) + '</span>' +
      '<span>Confidence: ' + esc(pr.confidence) + '</span></div>' +
      '<p>' + esc(pr.summary) + '</p>' +
      '<div class="blog-cases"><div class="blog-case up"><div class="blog-case-label">Bull case</div><p>' + esc(pr.bull_case) + '</p></div>' +
      '<div class="blog-case down"><div class="blog-case-label">Bear case</div><p>' + esc(pr.bear_case) + '</p></div></div>' +
      (pr.key_levels ? '<p class="blog-levels"><span>Key levels</span> ' + esc(pr.key_levels) + '</p>' : '') + '</div>');

    if (t.ticker) {
      html += section("Trade idea",
        '<div class="blog-trade"><div class="blog-trade-head"><span class="blog-trade-ticker">' + esc(t.ticker) + '</span>' +
        '<span>' + esc(t.name) + '</span><span class="blog-pill ' + tone(t.action) + '">' + esc(t.action) + '</span></div>' +
        '<div class="blog-trade-levels">' +
        '<div><span>Entry</span>' + esc(t.entry) + '</div><div><span>Target</span>' + esc(t.target) + '</div>' +
        '<div><span>Stop</span>' + esc(t.stop) + '</div><div><span>Confidence</span>' + esc(t.confidence) + '</div></div>' +
        '<p>' + esc(t.rationale) + '</p></div>');
    }

    if (p.watchlist && p.watchlist.length) {
      html += section("Watchlist", '<table class="data-table blog-watch"><thead><tr><th>Ticker</th><th>Signal</th><th>Note</th></tr></thead><tbody>' +
        p.watchlist.map(function (w) {
          return '<tr><td class="num">' + esc(w.ticker) + '</td><td><span class="blog-pill ' + tone(w.signal) + '">' + esc(w.signal) + '</span></td><td>' + esc(w.note) + '</td></tr>';
        }).join("") + '</tbody></table>');
    }

    var sources = (p.sources || []).filter(function (s) { return safeUrl(s.url); });
    if (sources.length) {
      html += section("Sources", '<ul class="blog-sources">' + sources.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.title || s.url) + '</a></li>';
      }).join("") + '</ul>');
    }

    html += '<p class="blog-disclaimer">Automated research brief. Not financial advice.</p>';
    root.innerHTML = html;
  }

  // -------------------------------------------------------------- routing

  function route() {
    var hash = window.location.hash.replace("#", "");
    if (hash !== "blog" && hash.indexOf("blog/") !== 0) return;

    var view = document.getElementById("view-blog");
    var root = document.getElementById("blogRoot");
    if (!view || !root) return;

    // app.js only knows about "#blog"; activate the view for "#blog/<slug>" too.
    document.querySelectorAll(".view").forEach(function (v) { v.classList.remove("active"); });
    document.querySelectorAll(".nav-item").forEach(function (n) { n.classList.remove("active"); });
    view.classList.add("active");
    var nav = document.querySelector('[data-view="blog"]');
    if (nav) nav.classList.add("active");
    var title = document.getElementById("pageTitle");
    if (title) title.textContent = "Blog";
    var main = document.getElementById("mainContent");
    if (main) main.scrollTop = 0;

    var slug = hash.indexOf("blog/") === 0 ? decodeURIComponent(hash.slice(5)) : "";
    root.innerHTML = '<div class="blog-empty">Loading&hellip;</div>';
    var job = slug ? loadPost(slug).then(function (p) { renderPost(root, p); })
                   : loadIndex().then(function (idx) { renderIndex(root, idx); });
    job.catch(function (err) {
      console.warn("[CIELO] blog:", err.message);
      root.innerHTML = '<div class="blog-empty">Couldn\'t load ' + (slug ? "this post" : "the blog") +
        '. <a href="#blog">Back to all posts</a></div>';
    });
  }

  window.addEventListener("hashchange", route);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", route);
  } else {
    route();
  }
})();
