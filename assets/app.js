// The Real LSAT of Atlanta — interactivity

(function () {
  'use strict';

  var JOURNAL_KEY = 'rlsata.wrongAnswerJournal.v1';
  var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  // ---------- Reveal-answer drill (used on landing page) ----------
  function wireRevealButtons() {
    var buttons = document.querySelectorAll('.reveal-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-target');
        var target = document.getElementById(targetId);
        if (!target) return;

        var nowVisible = target.classList.toggle('hidden') === false;
        btn.textContent = nowVisible ? 'Hide answer' : 'Reveal answer';

        if (nowVisible) {
          var container = btn.closest('.drill');
          if (container) {
            var choices = container.querySelectorAll('.drill-choices li');
            choices.forEach(function (li) {
              if (li.getAttribute('data-correct') === 'true') {
                li.classList.add('correct-reveal');
              }
            });
          }
        }
      });
    });
  }

  // ---------- Journal storage ----------
  function loadJournal() {
    try {
      var raw = localStorage.getItem(JOURNAL_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function saveJournal(journal) {
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(journal));
    } catch (e) {
      // localStorage may be unavailable (private mode); fail silently
    }
  }

  // ---------- Journal rendering ----------
  function buildEntryNode(entry) {
    var node = document.createElement('div');
    node.className = 'journal-entry';
    node.setAttribute('data-qid', entry.qid);

    var head = document.createElement('div');
    head.className = 'journal-entry-head';

    var tag = document.createElement('span');
    tag.className = 'journal-entry-tag';
    tag.innerHTML = entry.qtype;

    var num = document.createElement('span');
    num.className = 'journal-entry-num';
    num.textContent = 'Question ' + entry.qid;

    head.appendChild(tag);
    head.appendChild(num);
    node.appendChild(head);

    var stem = document.createElement('p');
    stem.className = 'journal-stem';
    stem.innerHTML = entry.stem;
    node.appendChild(stem);

    var youRow = document.createElement('p');
    youRow.className = 'journal-row you';
    youRow.innerHTML =
      '<span class="row-label">You picked</span>' +
      '<span class="choice-letter">' + entry.pickedLetter + '</span>' +
      escapeText(entry.pickedText);
    node.appendChild(youRow);

    var trap = document.createElement('div');
    trap.className = 'journal-trap';
    trap.innerHTML =
      '<span class="journal-section-label">Why that answer is wrong</span>' +
      escapeText(entry.trap);
    node.appendChild(trap);

    var rightRow = document.createElement('p');
    rightRow.className = 'journal-row right';
    rightRow.style.marginTop = '16px';
    rightRow.innerHTML =
      '<span class="row-label">Correct answer</span>' +
      '<span class="choice-letter">' + entry.correctLetter + '</span>' +
      escapeText(entry.correctText);
    node.appendChild(rightRow);

    var whyRight = document.createElement('div');
    whyRight.className = 'journal-why-right';
    whyRight.innerHTML =
      '<span class="journal-section-label">Why the correct answer is right</span>' +
      entry.explainHtml;
    node.appendChild(whyRight);

    return node;
  }

  function escapeText(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function renderJournal(journal) {
    var container = document.getElementById('journal-entries');
    var clearBtn = document.getElementById('journal-clear');
    var countEl = document.getElementById('score-journal');
    if (!container) return;

    var keys = Object.keys(journal).sort(function (a, b) {
      return parseInt(a, 10) - parseInt(b, 10);
    });

    if (countEl) countEl.textContent = keys.length;

    if (keys.length === 0) {
      container.innerHTML =
        '<p class="journal-empty">No misses yet. Get one wrong and it\'ll appear here with the receipts.</p>';
      if (clearBtn) clearBtn.classList.add('hidden');
      return;
    }

    container.innerHTML = '';
    keys.forEach(function (k) {
      container.appendChild(buildEntryNode(journal[k]));
    });
    if (clearBtn) clearBtn.classList.remove('hidden');
  }

  function appendEntry(entry) {
    var journal = loadJournal();
    journal[entry.qid] = entry;
    saveJournal(journal);
    renderJournal(journal);
  }

  function clearJournal() {
    saveJournal({});
    renderJournal({});
  }

  // ---------- Quiz grading ----------
  function wireQuiz() {
    var questions = document.querySelectorAll('.quiz-q');
    if (questions.length === 0) return;

    var state = {
      total: questions.length,
      answered: 0,
      correct: 0,
    };

    var totalEl = document.getElementById('score-total');
    var answeredEl = document.getElementById('score-answered');
    var correctEl = document.getElementById('score-correct');
    if (totalEl) totalEl.textContent = state.total;

    questions.forEach(function (q) {
      var correctIdx = parseInt(q.getAttribute('data-correct'), 10);
      var qid = q.getAttribute('data-qid');
      var qtype = q.getAttribute('data-qtype');
      var stemEl = q.querySelector('.qstem');
      var stemText = stemEl ? stemEl.textContent.trim() : '';
      var choices = q.querySelectorAll('.quiz-choices li');
      var explain = q.querySelector('.quiz-explain');
      var explainHtml = explain ? explain.innerHTML.trim() : '';
      var locked = false;

      choices.forEach(function (li, idx) {
        li.addEventListener('click', function () {
          if (locked) return;
          locked = true;

          li.classList.add('selected');

          choices.forEach(function (c, ci) {
            if (ci === correctIdx) {
              c.classList.add('correct');
            } else if (ci === idx) {
              c.classList.add('incorrect');
            }
          });

          if (explain) explain.classList.add('show');

          state.answered += 1;
          if (idx === correctIdx) {
            state.correct += 1;
          } else {
            // Log to wrong-answer journal
            var trap = li.getAttribute('data-trap') || '';
            var correctLi = choices[correctIdx];
            appendEntry({
              qid: qid,
              qtype: qtype,
              stem: stemText,
              pickedLetter: letters[idx] || '?',
              pickedText: li.textContent.trim(),
              trap: trap,
              correctLetter: letters[correctIdx] || '?',
              correctText: correctLi ? correctLi.textContent.trim() : '',
              explainHtml: explainHtml,
            });
          }
          if (answeredEl) answeredEl.textContent = state.answered;
          if (correctEl) correctEl.textContent = state.correct;
        });
      });
    });

    // Restore existing journal on page load
    renderJournal(loadJournal());

    var clearBtn = document.getElementById('journal-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Clear your Wrong Answer Journal? This cannot be undone.')) {
          clearJournal();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      wireRevealButtons();
      wireQuiz();
    });
  } else {
    wireRevealButtons();
    wireQuiz();
  }
})();
