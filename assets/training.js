// The Real LSAT of Atlanta — Training Arena engine + content

(function () {
  'use strict';

  if (!document.querySelector('.training-tabs')) return; // only run on training page

  var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  // ============================================================
  // CONTENT: Concept Drills
  // Each concept is a deck of mini-questions.
  // ============================================================
  var CONCEPTS = {
    'necessary-assumption': {
      label: 'Necessary Assumption',
      blurb: 'An unstated premise the argument MUST have. Test by negating the choice &mdash; if the argument breaks, it\'s necessary.',
      items: [
        {
          stimulus: 'NeNe argues: "Cynthia must be planning a party because she ordered enough champagne for fifty people."',
          question: 'Which assumption does NeNe\'s argument require?',
          choices: [
            { text: 'Cynthia is friends with at least fifty people.', correct: false, why: 'Out of scope. Whether Cynthia knows fifty people doesn\'t affect whether the champagne order signals a party. She could be hosting strangers.' },
            { text: 'The champagne is intended for a single occasion rather than long-term entertaining.', correct: true, why: 'Necessary. Negate it: "the champagne is for long-term entertaining." Now the order tells us nothing about a party. The argument breaks &mdash; that\'s the negation test confirming necessity.' },
            { text: 'Cynthia has hosted parties in the past.', correct: false, why: 'History is irrelevant. The argument is about THIS order, not Cynthia\'s pattern.' },
            { text: 'NeNe has been invited to the party.', correct: false, why: 'About NeNe, not about the argument\'s validity. Whether NeNe is on the guest list has no bearing on whether a party is being planned.' },
          ],
        },
        {
          stimulus: 'Khloé argues: "Tristan will be at Sunday dinner. Kris always invites him to Sunday dinner."',
          question: 'Which assumption does Khloé\'s argument require?',
          choices: [
            { text: 'Tristan is willing and able to attend dinners he is invited to.', correct: true, why: 'Necessary. Negate it: "Tristan refuses to attend dinners Kris invites him to." Now the invitation guarantees nothing &mdash; the argument collapses.' },
            { text: 'Kris\'s invitations are extended in writing.', correct: false, why: 'Premise booster about form, not logic. Invitation channel has no bearing on whether Tristan shows up.' },
            { text: 'Tristan and Khloé are on good terms.', correct: false, why: 'Red herring. The argument hinges on Kris\'s invitation, not the Khloé-Tristan relationship.' },
            { text: 'Sunday dinner is held weekly.', correct: false, why: 'Background fact. Frequency doesn\'t change whether THIS Sunday Tristan will be there.' },
          ],
        },
        {
          stimulus: 'Kim argues: "The new SKKN packaging will boost sales, because we\'ve redesigned packaging twice before and sales rose each time."',
          question: 'Which assumption does Kim\'s argument require?',
          choices: [
            { text: 'The new packaging is more attractive than the old.', correct: false, why: 'Sounds like a strengthener, but it\'s not necessary. The argument rests on the PATTERN of past redesigns &rarr; sales. Kim doesn\'t need to claim aesthetic superiority.' },
            { text: 'SKKN\'s sales are currently below target.', correct: false, why: 'About current state, not about the inference. The argument projects a sales BUMP regardless of starting point.' },
            { text: 'The conditions that made past redesigns boost sales also apply to the current SKKN redesign.', correct: true, why: 'Necessary. Negate it: "this redesign is happening under conditions where past redesigns wouldn\'t have boosted sales either." Kim\'s extrapolation collapses.' },
            { text: 'The redesign cost more than previous redesigns.', correct: false, why: 'Cost is irrelevant to whether the sales effect will repeat.' },
          ],
        },
      ],
    },

    'strengthen': {
      label: 'Strengthen',
      blurb: 'Add a fact that makes the conclusion more likely. You don\'t need to PROVE the conclusion &mdash; just nudge the scale.',
      items: [
        {
          stimulus: 'Cynthia argues that the cast should launch a podcast, because podcasts have driven significant brand revenue for other RHOA alumni.',
          question: 'Which of the following, if true, most strengthens Cynthia\'s argument?',
          choices: [
            { text: 'Listener engagement with cast-led reality TV podcasts has grown 40% year-over-year.', correct: true, why: 'Strengthener. Provides independent evidence that the audience for exactly the kind of podcast Cynthia proposes is expanding &mdash; making the projected revenue more plausible.' },
            { text: 'Podcasts are inexpensive to produce.', correct: false, why: 'Cost-side observation that doesn\'t bolster the revenue claim. A cheap project that fails is not what Cynthia is arguing for.' },
            { text: 'Cynthia has previously appeared as a guest on several podcasts.', correct: false, why: 'About Cynthia\'s personal history, not about whether THE PODCAST will succeed commercially. Speaker biography is rarely a strengthener.' },
            { text: 'Other RHOA alumni report enjoying their podcasts.', correct: false, why: 'Anecdotal sentiment, not commercial evidence. "They liked it" &ne; "it made money."' },
          ],
        },
        {
          stimulus: 'Kris argues that filming should move to morning sessions because energy is higher in the morning, which leads to better television.',
          question: 'Which of the following, if true, most strengthens Kris\'s argument?',
          choices: [
            { text: 'Production logs show morning takes required 30% fewer retakes than afternoon takes.', correct: true, why: 'Direct, measurable evidence that morning shoots produce a tangible quality improvement &mdash; exactly the connection Kris\'s argument needs.' },
            { text: 'The cast prefers morning call times.', correct: false, why: 'Cast preference is irrelevant to the QUALITY claim Kris makes about the resulting TV. Preference and quality are different metrics.' },
            { text: 'Morning shoots are less expensive to staff.', correct: false, why: 'Cost is a separate consideration. Kris\'s conclusion is about quality, not budget.' },
            { text: 'Morning television generally has higher ratings.', correct: false, why: 'Talks about when the show AIRS, not when it\'s FILMED. Subject swap.' },
          ],
        },
        {
          stimulus: 'Drew argues she should be cast in a spinoff because her storyline this season ranked highest in social media engagement.',
          question: 'Which of the following, if true, most strengthens Drew\'s argument?',
          choices: [
            { text: 'Network executives have a track record of greenlighting spinoffs for the cast member whose storyline drove the highest social engagement.', correct: true, why: 'Connects Drew\'s premise (highest engagement) to her conclusion (deserves a spinoff) via the network\'s actual pattern. That\'s exactly what a strengthener does.' },
            { text: 'Drew has the most Instagram followers of any current cast member.', correct: false, why: 'Followers and engagement are different metrics. Drew already claimed the engagement crown &mdash; a follower-count assertion is a sidestep, not a buttress.' },
            { text: 'Drew enjoys filming.', correct: false, why: 'Speaker-preference trap. Her enjoyment is irrelevant to the network\'s casting logic.' },
            { text: 'Spinoffs are a popular format right now.', correct: false, why: 'Background fact about the genre. Doesn\'t connect engagement &rarr; Drew\'s spinoff specifically.' },
          ],
        },
      ],
    },

    'weaken': {
      label: 'Weaken',
      blurb: 'Add a fact that undermines the conclusion. Look for alternate causes, counterexamples, or broken links.',
      items: [
        {
          stimulus: 'Marlo argues that her fashion line failed because the marketing budget was too small.',
          question: 'Which of the following, if true, most weakens Marlo\'s argument?',
          choices: [
            { text: 'The line received the same marketing budget as Marlo\'s prior collections, which succeeded.', correct: true, why: 'Severs the causal link. If the same budget previously WORKED, then "small budget" isn\'t a credible explanation for THIS failure. Marlo needs to look elsewhere.' },
            { text: 'Marlo personally promoted the line on Instagram.', correct: false, why: 'Adds an additional promotional channel, which slightly STRENGTHENS the budget-was-not-the-issue position only indirectly. The decisive weakener is the comparison in (A).' },
            { text: 'Other small-budget launches have also failed.', correct: false, why: 'Could go either way &mdash; small budgets failing across the board could be read as support for Marlo. Ambiguous beats explicit on weaken questions, never the reverse.' },
            { text: 'Fashion marketing budgets have risen industry-wide.', correct: false, why: 'Background industry fact. Doesn\'t address whether THIS line\'s budget caused its failure.' },
          ],
        },
        {
          stimulus: 'Kourtney argues that Poosh wellness articles CAUSE readers to live healthier lives, because Poosh readers report better health than the general population.',
          question: 'Which of the following, if true, most weakens Kourtney\'s argument?',
          choices: [
            { text: 'Poosh\'s audience is drawn primarily from already-health-conscious demographics.', correct: true, why: 'Selection bias. If readers were already healthier BEFORE encountering Poosh, the articles didn\'t cause their health &mdash; their pre-existing habits did. Classic alternate-cause weakener.' },
            { text: 'Poosh publishes a new article every weekday.', correct: false, why: 'Publication frequency tells you nothing about the causal claim.' },
            { text: 'Some Poosh articles cover entertainment topics, not wellness.', correct: false, why: 'A few off-topic articles don\'t undermine whether the WELLNESS articles cause health changes in readers.' },
            { text: 'Kourtney does not write the articles herself.', correct: false, why: 'Authorship is irrelevant to whether the articles produce the claimed effect.' },
          ],
        },
        {
          stimulus: 'Porsha argues that her podcast outperforms the show because her podcast\'s monthly downloads exceed the show\'s monthly viewership.',
          question: 'Which of the following, if true, most weakens Porsha\'s argument?',
          choices: [
            { text: 'A podcast "download" is counted per device; an episode "viewership" figure is counted per household, which often includes multiple viewers.', correct: true, why: 'Apples-to-oranges. If downloads count devices and viewership counts households, the metrics aren\'t comparable &mdash; Porsha\'s comparison rests on units that measure different things.' },
            { text: 'Porsha\'s podcast guests are well known.', correct: false, why: 'Strengthens the podcast\'s appeal, but doesn\'t undermine the comparison. Wrong direction.' },
            { text: 'The show airs once a week; the podcast posts twice a week.', correct: false, why: 'Cadence difference is real but doesn\'t resolve the comparison &mdash; both metrics are monthly totals in the stimulus.' },
            { text: 'Most podcast listeners also watch the show.', correct: false, why: 'Audience overlap doesn\'t address whether one outperforms the other; it speaks to a different question.' },
          ],
        },
      ],
    },

    'flaw': {
      label: 'Flaw',
      blurb: 'Name what\'s wrong with the reasoning. Learn the flaw families &mdash; ad hominem, false dichotomy, correlation/causation, hasty generalization, appeal to authority.',
      items: [
        {
          stimulus: 'NeNe says: "Drew never starts fights, so when she\'s involved in one, she must have been provoked."',
          question: 'The reasoning is most vulnerable to criticism on the grounds that it...',
          choices: [
            { text: 'Treats an unsupported behavioral claim as if it guaranteed an explanation in every case.', correct: true, why: 'NeNe builds on "Drew never starts fights" &mdash; an absolute claim &mdash; and uses it to RULE OUT the possibility that Drew started this one. The argument depends on the absolute holding in 100% of cases, which is rarely defensible.' },
            { text: 'Confuses correlation with causation.', correct: false, why: 'No causal claim is being made &mdash; NeNe is making an inference about who started a specific fight, not about whether one variable causes another.' },
            { text: 'Generalizes from a single instance.', correct: false, why: 'NeNe isn\'t generalizing from one fight to all fights; she\'s applying a universal claim TO a specific instance. Opposite direction.' },
            { text: 'Relies on circular reasoning.', correct: false, why: 'The premise ("never starts fights") and the conclusion ("must have been provoked") are distinct claims, so the argument isn\'t circular.' },
          ],
        },
        {
          stimulus: 'Kim says: "Critics of SKIMS\' shapewear are simply wrong. They don\'t understand fashion."',
          question: 'The reasoning is most vulnerable to criticism on the grounds that it...',
          choices: [
            { text: 'Attacks the critics rather than addressing their criticism.', correct: true, why: 'Textbook ad hominem. Whether or not the critics understand fashion has no bearing on whether their specific criticisms are correct. Kim dismisses the messengers instead of the message.' },
            { text: 'Generalizes from a single instance.', correct: false, why: 'No generalization &mdash; Kim is making a sweeping dismissal, not extrapolating from a sample.' },
            { text: 'Mistakes a sufficient condition for a necessary one.', correct: false, why: 'No conditional structure is in play here.' },
            { text: 'Appeals to popular opinion rather than evidence.', correct: false, why: 'Kim isn\'t citing popular opinion &mdash; she\'s questioning the critics\' qualifications. Different flaw family.' },
          ],
        },
        {
          stimulus: 'Andy says: "Either we hold a sit-down reunion or there will be no resolution to this season\'s drama. Therefore, we need a sit-down reunion."',
          question: 'The reasoning is most vulnerable to criticism on the grounds that it...',
          choices: [
            { text: 'Treats two options as exhaustive when others may be available.', correct: true, why: 'False dichotomy. A virtual reunion, a one-on-one, or an off-camera conversation might also produce resolution. Andy\'s "either/or" framing prematurely excludes the alternatives.' },
            { text: 'Confuses correlation with causation.', correct: false, why: 'No causal claim is at issue; the move is structural, not causal.' },
            { text: 'Relies on a sample too small to justify the conclusion.', correct: false, why: 'No sample is involved &mdash; the argument is deductive in form, not inductive.' },
            { text: 'Restates the conclusion as a premise.', correct: false, why: 'The premise (an either/or claim) and the conclusion (one of the alternatives) are distinct propositions. Not circular.' },
          ],
        },
      ],
    },

    'main-point': {
      label: 'Main Point',
      blurb: 'What the speaker is ultimately trying to get you to BELIEVE. Watch for sub-conclusions and premises &mdash; they aren\'t the main point.',
      items: [
        {
          stimulus: 'NeNe: "I\'ve been on this show for ten years. I know what the fans want. Cynthia thinks the trip should be to Anguilla, but Anguilla is overdone. We should go to Greece. Greece has the views, the boats, and the drama."',
          question: 'Which of the following most accurately expresses the main point?',
          choices: [
            { text: 'The group should take its next trip to Greece.', correct: true, why: 'Everything else is doing supporting work &mdash; NeNe\'s tenure, fan expertise, the Anguilla critique, the Greece praise. The PRESCRIPTIVE claim ("should go to Greece") is what she\'s trying to land.' },
            { text: 'NeNe knows what the fans want.', correct: false, why: 'A premise &mdash; NeNe offers her tenure as authority to support her recommendation. Not the conclusion.' },
            { text: 'Anguilla is an overdone destination.', correct: false, why: 'Another premise &mdash; a knock against the alternative, used to set up the Greece recommendation. Not the main point.' },
            { text: 'Cynthia is wrong about Anguilla.', correct: false, why: 'A sub-conclusion supporting the main point. The argument doesn\'t end with "Cynthia is wrong" &mdash; it ends with "we should go to Greece."' },
          ],
        },
        {
          stimulus: 'Kris: "Production costs keep rising. Sponsorship revenue is flat. We have to choose between renegotiating our existing deals or restructuring the company. Restructuring keeps us nimble. We should restructure."',
          question: 'Which of the following most accurately expresses the main point?',
          choices: [
            { text: 'The company should restructure.', correct: true, why: 'Final prescriptive sentence &mdash; everything before it (rising costs, flat revenue, the choice frame, the nimbleness benefit) is supporting evidence and reasoning.' },
            { text: 'Production costs are rising.', correct: false, why: 'A premise setting up the problem. Premises are supporting cast, not the lead.' },
            { text: 'Restructuring keeps the company nimble.', correct: false, why: 'A sub-conclusion serving the bigger conclusion. "Nimbleness" is the REASON to restructure, not the call to action.' },
            { text: 'The company faces a choice between renegotiation and restructuring.', correct: false, why: 'A framing claim that sets up the recommendation. Not the recommendation itself.' },
          ],
        },
        {
          stimulus: 'Kourtney: "Wellness is having a cultural moment. Our audience trends wellness-curious. Competing brands have already moved on this. We should launch a wellness vertical for Poosh now."',
          question: 'Which of the following most accurately expresses the main point?',
          choices: [
            { text: 'Poosh should launch a wellness vertical now.', correct: true, why: 'The recommendation. Everything else &mdash; market timing, audience fit, competitive pressure &mdash; supports it.' },
            { text: 'Wellness is currently a cultural moment.', correct: false, why: 'Premise about market context.' },
            { text: 'Competitors have moved on the wellness opportunity.', correct: false, why: 'Premise creating urgency. Not the conclusion.' },
            { text: 'Poosh\'s audience is wellness-curious.', correct: false, why: 'Premise about audience fit. Supports the recommendation but isn\'t it.' },
          ],
        },
      ],
    },

    'parallel': {
      label: 'Parallel Reasoning',
      blurb: 'Match the LOGICAL STRUCTURE, not the subject matter. A conditional chain about reunions parallels a conditional chain about cars.',
      items: [
        {
          stimulus: 'If Tristan is at the dinner, the room gets tense. If the room gets tense, Kris leaves early. So if Tristan is at the dinner, Kris leaves early.',
          question: 'Which argument has the same logical structure?',
          choices: [
            { text: 'If a phone is unlocked, it can install apps. If a phone can install apps, it can run software. So if a phone is unlocked, it can run software.', correct: true, why: 'Hypothetical syllogism: A&rarr;B, B&rarr;C, therefore A&rarr;C. Same chain shape, different subject matter &mdash; which is exactly the test.' },
            { text: 'If Tristan is at the dinner, Kris leaves early. Kris left early. So Tristan was at the dinner.', correct: false, why: 'Affirms the consequent &mdash; INVALID. The stimulus is a valid syllogism; a parallel must match validity AND shape.' },
            { text: 'Either Tristan is at the dinner or the room stays calm. The room stayed calm. So Tristan was not at the dinner.', correct: false, why: 'Disjunctive syllogism. Different valid form &mdash; either/or elimination instead of conditional chain.' },
            { text: 'All Tristan-attended dinners are tense. This dinner is Tristan-attended. So this dinner is tense.', correct: false, why: 'Categorical syllogism (universal to instance). Same validity, different shape from a conditional chain.' },
          ],
        },
        {
          stimulus: 'Every housewife who appeared on this season\'s finale was nominated for the Bravo Award. Marlo appeared on this season\'s finale. So Marlo was nominated for the Bravo Award.',
          question: 'Which argument has the same logical structure?',
          choices: [
            { text: 'Every member of the cast who signed the contract receives the bonus. Drew signed the contract. So Drew receives the bonus.', correct: true, why: 'Categorical syllogism: All M are N. X is M. So X is N. Identical structure &mdash; universal class statement plus an instance.' },
            { text: 'If the contract is signed, the bonus is paid. The bonus was paid. So the contract was signed.', correct: false, why: 'Affirms the consequent &mdash; invalid. Stimulus is valid.' },
            { text: 'Most members of the cast attended the premiere. Drew is a member of the cast. So Drew probably attended the premiere.', correct: false, why: '"Most" instead of "all" makes the conclusion probabilistic, not deductive. Different strength of inference.' },
            { text: 'No member of the cast missed the premiere. So every member attended.', correct: false, why: 'A two-step inference from a negative universal, not a categorical syllogism with a middle term.' },
          ],
        },
      ],
    },
  };

  // ============================================================
  // CONTENT: Trap Spotter
  // ============================================================
  var TRAP_LABELS = {
    'out-of-scope': { name: 'Out of Scope', desc: 'Brings in a topic the argument never touched.' },
    'premise-booster': { name: 'Premise Booster', desc: 'Strengthens a premise but doesn\'t address the conclusion.' },
    'wrong-direction': { name: 'Wrong Direction', desc: 'Pushes against the side you were asked to support (or vice versa).' },
    'wrong-subject': { name: 'Wrong Subject', desc: 'Switches the subject of the argument under cover of related language.' },
    'speaker-preference': { name: 'Speaker Preference', desc: 'Cites the speaker\'s feelings instead of evidence about the conclusion.' },
    'overreach': { name: 'Overreach', desc: 'Goes further than the stimulus or task allows.' },
    'reversal': { name: 'Reversal', desc: 'Swaps a conditional with its inverse or converse.' },
    'background-fact': { name: 'Background Fact', desc: 'True context that doesn\'t move the argument either way.' },
  };

  var TRAPS = [
    {
      stimulus: 'Kim argues: "SKIMS broke records this quarter because of the viral marketing campaign. The line sold out within 24 hours."',
      task: 'STRENGTHEN',
      wrongAnswer: 'SKIMS\' marketing team has won three industry awards in the past five years.',
      correctTrap: 'background-fact',
      options: ['background-fact', 'wrong-direction', 'wrong-subject', 'premise-booster'],
      explain: 'Awards are decorative context. They don\'t connect THIS campaign to THIS quarter\'s record. Background facts feel relevant because they sit in the same neighborhood, but they don\'t do logical work.',
    },
    {
      stimulus: 'Kandi argues: "The studio business is more profitable than touring, because studio revenue is up year-over-year."',
      task: 'STRENGTHEN',
      wrongAnswer: 'Kandi prefers studio work over touring.',
      correctTrap: 'speaker-preference',
      options: ['speaker-preference', 'out-of-scope', 'wrong-subject', 'reversal'],
      explain: 'A claim about Kandi\'s feelings cannot strengthen a claim about profit. Speaker-preference traps are designed to exploit the assumption that what the speaker likes must matter to the argument; it almost never does.',
    },
    {
      stimulus: 'Cynthia argues: "Cast members should be required to live in Atlanta during filming, because being in town keeps storylines authentic."',
      task: 'WEAKEN',
      wrongAnswer: 'Atlanta has high housing costs.',
      correctTrap: 'out-of-scope',
      options: ['out-of-scope', 'wrong-direction', 'speaker-preference', 'background-fact'],
      explain: 'Cost has no bearing on authenticity, which is what the conclusion concerns. The choice introduces a topic the stimulus never raised, then hopes you confuse difficulty with refutation.',
    },
    {
      stimulus: 'Khloé argues: "Good American\'s next launch will succeed because the campaign hired the same influencers as the brand\'s first sellout launch."',
      task: 'WEAKEN',
      wrongAnswer: 'The campaign\'s production was more expensive than the first launch\'s.',
      correctTrap: 'wrong-subject',
      options: ['wrong-subject', 'overreach', 'premise-booster', 'out-of-scope'],
      explain: 'Higher production cost says nothing about whether the launch will sell. The choice swaps the SUBJECT (sales success) for a related but different one (campaign budget). Common subject-switch trap.',
    },
    {
      stimulus: 'Kris argues: "If we add the wedding episode, ratings will spike. So we should add it."',
      task: 'NECESSARY ASSUMPTION',
      wrongAnswer: 'A ratings spike will outweigh any negative consequence of adding the wedding episode.',
      correctTrap: 'overreach',
      options: ['overreach', 'reversal', 'wrong-direction', 'background-fact'],
      explain: 'Kris\'s argument needs the wedding to PRODUCE a ratings spike &mdash; not that the spike outweighs ALL possible costs. The choice imposes a much stronger condition than the argument requires; necessary assumptions are the SMALLEST thing the argument needs.',
    },
    {
      stimulus: 'Marlo argues: "If a cast member skips the reunion, they lose their peach. Drew did not skip the reunion. So Drew will keep her peach."',
      task: 'PARALLEL REASONING (the stimulus contains a flaw &mdash; spot which trap an answer commits)',
      wrongAnswer: 'If a cast member skips the reunion, they lose their peach. Drew lost her peach. So Drew skipped the reunion.',
      correctTrap: 'reversal',
      options: ['reversal', 'wrong-direction', 'out-of-scope', 'overreach'],
      explain: 'The original stimulus denies the antecedent (invalid). The answer swaps to AFFIRMING THE CONSEQUENT (also invalid, but a different fallacy). Both are conditional-logic reversals of the same valid form; matching the WRONG reversal is the trap.',
    },
  ];

  // ============================================================
  // CONTENT: Find the Conclusion
  // ============================================================
  var CONCLUSIONS = [
    {
      title: 'Cynthia on Instagram strategy',
      sentences: [
        { text: 'Cynthia has more Instagram followers than any other current cast member.', role: 'premise', why: 'A fact that supports the conclusion. Notice the data-driven feel &mdash; premises often look like evidence.' },
        { text: 'Follower count correlates strongly with brand-deal income.', role: 'premise', why: 'A general principle premise. It connects the specific fact (Cynthia\'s followers) to the conclusion (Cynthia\'s prospects).' },
        { text: 'Cynthia is the cast member most likely to land a major brand deal this year.', role: 'conclusion', why: 'The prediction the speaker is trying to get you to accept. Notice it is the SYNTHESIS of the two premises &mdash; specific fact + general principle = projection about Cynthia.' },
      ],
    },
    {
      title: 'Kris on programming',
      sentences: [
        { text: 'Audiences have tired of heavily produced reality content.', role: 'premise', why: 'A diagnostic premise &mdash; describes the situation the speaker is responding to.' },
        { text: 'Unmediated platforms like podcasts and live streams have shown sustained engagement growth.', role: 'premise', why: 'A second premise establishing the alternative. Notice the speaker is building a case before delivering the recommendation.' },
        { text: 'The family should reallocate half its scripted programming time into unmediated platforms.', role: 'conclusion', why: 'The prescriptive claim &mdash; "should" is your signal word. The two prior sentences are reasons; this is the recommendation those reasons exist to support.' },
        { text: 'This shift does not mean retreating from the camera.', role: 'qualifier', why: 'A defensive qualifier added to forestall a likely objection. Not a conclusion &mdash; it doesn\'t move the argument forward, it protects it from a counter.' },
      ],
    },
    {
      title: 'Andy on reunion structure',
      sentences: [
        { text: 'Last season\'s reunion ran four hours and viewers tuned out in the third hour.', role: 'premise', why: 'A specific data point premise &mdash; introduces evidence.' },
        { text: 'Viewer fatigue tends to peak between the two and three hour marks.', role: 'premise', why: 'A general claim premise &mdash; connects the specific case to a pattern.' },
        { text: 'Therefore, next season\'s reunion should be capped at three hours.', role: 'conclusion', why: '"Therefore" is the conclusion word doing the work for you. Anything after "therefore" or "so" or "thus" is overwhelmingly the conclusion.' },
      ],
    },
    {
      title: 'Drew on her storyline',
      sentences: [
        { text: 'Critics say Drew\'s storyline this season was too low-stakes.', role: 'counterpoint', why: 'A counterpoint &mdash; the OPPOSING view the speaker plans to argue against. Not the conclusion; the speaker is about to refute it.' },
        { text: 'But the social engagement on her scenes outranked every other cast member\'s.', role: 'premise', why: 'A rebuttal premise &mdash; data offered to push back on the critics. The "but" is doing the structural work of pivoting from counter to main argument.' },
        { text: 'Drew\'s storyline was, in fact, the season\'s most successful.', role: 'conclusion', why: 'The speaker\'s main claim &mdash; the position they want you to accept. The premise (social engagement) supports it; the counterpoint sets up the contrast that makes the claim feel earned.' },
      ],
    },
  ];

  // ============================================================
  // ENGINE
  // ============================================================
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ---------- Tab switching ----------
  function wireTabs() {
    var tabs = document.querySelectorAll('.training-tab');
    var panels = document.querySelectorAll('.training-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var mode = tab.getAttribute('data-mode');
        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach(function (p) {
          p.classList.toggle('hidden', p.getAttribute('data-panel') !== mode);
        });
      });
    });
  }

  // ---------- Concept Drills ----------
  function renderConceptChips() {
    var host = document.getElementById('concept-chips');
    if (!host) return;
    Object.keys(CONCEPTS).forEach(function (key) {
      var btn = document.createElement('button');
      btn.className = 'concept-chip';
      btn.setAttribute('data-concept', key);
      btn.textContent = CONCEPTS[key].label;
      btn.addEventListener('click', function () {
        document.querySelectorAll('.concept-chip').forEach(function (c) {
          c.classList.toggle('is-active', c === btn);
        });
        startConceptDeck(key);
      });
      host.appendChild(btn);
    });
  }

  function startConceptDeck(key) {
    var concept = CONCEPTS[key];
    var state = {
      key: key,
      deck: shuffle(concept.items),
      idx: 0,
      correct: 0,
    };
    renderConceptCard(state);
  }

  function renderConceptCard(state) {
    var host = document.getElementById('concept-drill-area');
    if (!host) return;
    var concept = CONCEPTS[state.key];
    var item = state.deck[state.idx];

    var node = document.createElement('div');
    node.className = 'drill-card';

    var head = '<div class="drill-card-head">' +
      '<span class="drill-card-tag">' + esc(concept.label) + '</span>' +
      '<span class="drill-card-progress">Card ' + (state.idx + 1) + ' of ' + state.deck.length + ' &middot; <span class="drill-score">' + state.correct + ' right</span></span>' +
      '</div>' +
      '<p class="drill-blurb">' + concept.blurb + '</p>' +
      '<p class="drill-stimulus"><strong>Stimulus.</strong> ' + esc(item.stimulus) + '</p>' +
      '<p class="drill-question">' + esc(item.question) + '</p>';

    var listHtml = '<ol class="drill-choices choice-list">';
    item.choices.forEach(function (c, i) {
      listHtml += '<li data-i="' + i + '" data-correct="' + (c.correct ? '1' : '0') + '">' + esc(c.text) + '</li>';
    });
    listHtml += '</ol>';

    node.innerHTML = head + listHtml + '<div class="drill-feedback hidden"></div>' +
      '<div class="drill-actions">' +
      '<button class="btn ghost drill-next hidden">' + (state.idx + 1 < state.deck.length ? 'Next card &rarr;' : 'Finish deck') + '</button>' +
      '</div>';

    host.innerHTML = '';
    host.appendChild(node);

    var choices = node.querySelectorAll('.choice-list li');
    var feedback = node.querySelector('.drill-feedback');
    var nextBtn = node.querySelector('.drill-next');
    var locked = false;

    choices.forEach(function (li) {
      li.addEventListener('click', function () {
        if (locked) return;
        locked = true;
        var pickedIdx = parseInt(li.getAttribute('data-i'), 10);
        var picked = item.choices[pickedIdx];

        choices.forEach(function (c, ci) {
          var isCorrect = item.choices[ci].correct;
          if (isCorrect) c.classList.add('is-correct');
          if (ci === pickedIdx && !isCorrect) c.classList.add('is-incorrect');
        });

        if (picked.correct) state.correct += 1;

        var html = '<div class="drill-feedback-inner ' + (picked.correct ? 'right' : 'wrong') + '">' +
          '<span class="drill-feedback-label">' + (picked.correct ? 'Correct &mdash; ' + letters[pickedIdx] : 'You picked ' + letters[pickedIdx] + ' &mdash; not quite') + '</span>' +
          '<p>' + esc(picked.why) + '</p>';

        if (!picked.correct) {
          var correctIdx = item.choices.findIndex(function (c) { return c.correct; });
          var correctChoice = item.choices[correctIdx];
          html += '<p class="drill-feedback-correct"><strong>Correct answer: ' + letters[correctIdx] + '.</strong> ' + esc(correctChoice.text) + '</p>' +
            '<p>' + esc(correctChoice.why) + '</p>';
        }
        html += '</div>';
        feedback.innerHTML = html;
        feedback.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
      });
    });

    nextBtn.addEventListener('click', function () {
      if (state.idx + 1 < state.deck.length) {
        state.idx += 1;
        renderConceptCard(state);
      } else {
        renderConceptComplete(state);
      }
    });
  }

  function renderConceptComplete(state) {
    var host = document.getElementById('concept-drill-area');
    if (!host) return;
    var concept = CONCEPTS[state.key];
    var pct = Math.round(100 * state.correct / state.deck.length);
    host.innerHTML =
      '<div class="drill-card drill-complete">' +
      '<div class="drill-card-head"><span class="drill-card-tag">Deck complete</span></div>' +
      '<h3 class="drill-complete-title">' + esc(concept.label) + ': ' + state.correct + ' / ' + state.deck.length + '</h3>' +
      '<p class="drill-complete-pct">' + pct + '% on this run.</p>' +
      '<div class="drill-actions">' +
      '<button class="btn primary drill-restart" type="button">Run it again</button>' +
      '<button class="btn ghost drill-switch" type="button">Pick another concept</button>' +
      '</div>' +
      '</div>';
    host.querySelector('.drill-restart').addEventListener('click', function () { startConceptDeck(state.key); });
    host.querySelector('.drill-switch').addEventListener('click', function () {
      document.querySelectorAll('.concept-chip').forEach(function (c) { c.classList.remove('is-active'); });
      host.innerHTML = '<p class="drill-empty">Pick a concept above to start drilling.</p>';
    });
  }

  // ---------- Trap Spotter ----------
  var trapState = { remaining: [], correct: 0, attempted: 0 };

  function startTrapSession() {
    trapState = { remaining: shuffle(TRAPS), correct: 0, attempted: 0 };
    renderTrap();
  }

  function renderTrap() {
    var host = document.getElementById('trap-drill-area');
    if (!host) return;
    if (trapState.remaining.length === 0) {
      host.innerHTML =
        '<div class="drill-card drill-complete">' +
        '<div class="drill-card-head"><span class="drill-card-tag">Round complete</span></div>' +
        '<h3 class="drill-complete-title">Trap Spotter: ' + trapState.correct + ' / ' + trapState.attempted + '</h3>' +
        '<p class="drill-complete-pct">Run another round to keep the reflex sharp.</p>' +
        '<div class="drill-actions"><button class="btn primary trap-restart">New round</button></div>' +
        '</div>';
      host.querySelector('.trap-restart').addEventListener('click', startTrapSession);
      return;
    }

    var item = trapState.remaining[0];
    var optionsHtml = item.options.map(function (k) {
      var label = TRAP_LABELS[k];
      return '<button class="trap-option" data-k="' + k + '"><span class="trap-option-name">' + esc(label.name) + '</span><span class="trap-option-desc">' + esc(label.desc) + '</span></button>';
    }).join('');

    host.innerHTML =
      '<div class="drill-card">' +
      '<div class="drill-card-head">' +
      '<span class="drill-card-tag">Trap Spotter</span>' +
      '<span class="drill-card-progress">Round score: <span class="drill-score">' + trapState.correct + ' / ' + trapState.attempted + '</span></span>' +
      '</div>' +
      '<p class="drill-blurb">The question type is <strong>' + esc(item.task) + '</strong>. The answer below is wrong. Name the trap it commits.</p>' +
      '<p class="drill-stimulus"><strong>Stimulus.</strong> ' + esc(item.stimulus) + '</p>' +
      '<p class="trap-answer-label">Wrong answer choice:</p>' +
      '<p class="trap-answer">' + esc(item.wrongAnswer) + '</p>' +
      '<div class="trap-options">' + optionsHtml + '</div>' +
      '<div class="drill-feedback hidden"></div>' +
      '<div class="drill-actions"><button class="btn ghost trap-next hidden">Next trap &rarr;</button></div>' +
      '</div>';

    var locked = false;
    host.querySelectorAll('.trap-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (locked) return;
        locked = true;
        var picked = btn.getAttribute('data-k');
        var right = picked === item.correctTrap;
        trapState.attempted += 1;
        if (right) trapState.correct += 1;

        host.querySelectorAll('.trap-option').forEach(function (b) {
          var k = b.getAttribute('data-k');
          if (k === item.correctTrap) b.classList.add('is-correct');
          if (b === btn && !right) b.classList.add('is-incorrect');
          b.disabled = true;
        });

        var fb = host.querySelector('.drill-feedback');
        fb.innerHTML = '<div class="drill-feedback-inner ' + (right ? 'right' : 'wrong') + '">' +
          '<span class="drill-feedback-label">' + (right ? 'Got it &mdash; ' + TRAP_LABELS[item.correctTrap].name : 'Trap was ' + TRAP_LABELS[item.correctTrap].name) + '</span>' +
          '<p>' + esc(item.explain) + '</p>' +
          '</div>';
        fb.classList.remove('hidden');
        host.querySelector('.trap-next').classList.remove('hidden');
      });
    });

    host.querySelector('.trap-next').addEventListener('click', function () {
      trapState.remaining.shift();
      renderTrap();
    });
  }

  // ---------- Find the Conclusion ----------
  var conclusionState = { remaining: [], correct: 0, attempted: 0 };

  function startConclusionSession() {
    conclusionState = { remaining: shuffle(CONCLUSIONS), correct: 0, attempted: 0 };
    renderConclusion();
  }

  function renderConclusion() {
    var host = document.getElementById('conclusion-drill-area');
    if (!host) return;
    if (conclusionState.remaining.length === 0) {
      host.innerHTML =
        '<div class="drill-card drill-complete">' +
        '<div class="drill-card-head"><span class="drill-card-tag">Round complete</span></div>' +
        '<h3 class="drill-complete-title">Conclusion drill: ' + conclusionState.correct + ' / ' + conclusionState.attempted + '</h3>' +
        '<p class="drill-complete-pct">Pulling conclusions out of stimuli is the foundation of LR &mdash; run another round.</p>' +
        '<div class="drill-actions"><button class="btn primary conclusion-restart">New round</button></div>' +
        '</div>';
      host.querySelector('.conclusion-restart').addEventListener('click', startConclusionSession);
      return;
    }

    var item = conclusionState.remaining[0];
    var sentencesHtml = item.sentences.map(function (s, i) {
      return '<button class="conclusion-sentence" data-i="' + i + '" data-role="' + s.role + '">' + esc(s.text) + '</button>';
    }).join('');

    host.innerHTML =
      '<div class="drill-card">' +
      '<div class="drill-card-head">' +
      '<span class="drill-card-tag">Find the Conclusion</span>' +
      '<span class="drill-card-progress">Round score: <span class="drill-score">' + conclusionState.correct + ' / ' + conclusionState.attempted + '</span></span>' +
      '</div>' +
      '<p class="drill-blurb"><strong>' + esc(item.title) + '.</strong> Read all the sentences. Click the one that is the speaker\'s conclusion.</p>' +
      '<div class="conclusion-sentences">' + sentencesHtml + '</div>' +
      '<div class="drill-feedback hidden"></div>' +
      '<div class="drill-actions"><button class="btn ghost conclusion-next hidden">Next stimulus &rarr;</button></div>' +
      '</div>';

    var locked = false;
    host.querySelectorAll('.conclusion-sentence').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (locked) return;
        locked = true;
        var idx = parseInt(btn.getAttribute('data-i'), 10);
        var picked = item.sentences[idx];
        var right = picked.role === 'conclusion';

        conclusionState.attempted += 1;
        if (right) conclusionState.correct += 1;

        // Color every sentence by its role
        host.querySelectorAll('.conclusion-sentence').forEach(function (b, i) {
          var role = item.sentences[i].role;
          b.classList.add('role-' + role);
          if (b === btn) b.classList.add('picked');
          b.disabled = true;
        });

        var correctIdx = item.sentences.findIndex(function (s) { return s.role === 'conclusion'; });
        var correctSentence = item.sentences[correctIdx];

        var fb = host.querySelector('.drill-feedback');
        var html = '<div class="drill-feedback-inner ' + (right ? 'right' : 'wrong') + '">' +
          '<span class="drill-feedback-label">' + (right ? 'Correct.' : 'The conclusion was sentence ' + (correctIdx + 1) + '.') + '</span>' +
          '<p><strong>What you picked (sentence ' + (idx + 1) + ', ' + esc(picked.role) + '):</strong> ' + esc(picked.why) + '</p>';
        if (!right) {
          html += '<p><strong>The actual conclusion (sentence ' + (correctIdx + 1) + '):</strong> ' + esc(correctSentence.why) + '</p>';
        }
        html += '<p class="role-legend"><strong>Legend.</strong> Each sentence is now color-coded: gold = conclusion, soft pink = premise, dim = counterpoint or qualifier.</p>' +
          '</div>';
        fb.innerHTML = html;
        fb.classList.remove('hidden');
        host.querySelector('.conclusion-next').classList.remove('hidden');
      });
    });

    host.querySelector('.conclusion-next').addEventListener('click', function () {
      conclusionState.remaining.shift();
      renderConclusion();
    });
  }

  // ---------- Init ----------
  function init() {
    wireTabs();
    renderConceptChips();
    startTrapSession();
    startConclusionSession();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
