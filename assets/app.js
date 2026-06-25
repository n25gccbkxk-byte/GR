// The Real LSAT of Atlanta — interactivity

(function () {
  'use strict';

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
      var choices = q.querySelectorAll('.quiz-choices li');
      var explain = q.querySelector('.quiz-explain');
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
          if (idx === correctIdx) state.correct += 1;
          if (answeredEl) answeredEl.textContent = state.answered;
          if (correctEl) correctEl.textContent = state.correct;
        });
      });
    });
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
