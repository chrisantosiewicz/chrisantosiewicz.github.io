// Project content. Edit this file, then run: node tools/build.mjs
// Order here is the order on the home page. `card` is the short text on the home page.
export default [
  {
    "slug": "nfl-scouting-report",
    "featuredImage": "assets/img/nfl-scout-home.jpg",
    "featuredAlt": "The scouting site home page with a grid of all 32 NFL team logos to pick a team.",
    "sport": "NFL",
    "category": "NFL",
    "status": "live",
    "updated": "2026-11-16",
    "title": "NFL Scouting Report Website",
    "subtitle": "Weekly opponent scouting for all 32 teams, rebuilt from play-by-play every week.",
    "card": "An automated scouting site for every NFL matchup. R loads nflverse play-by-play into DuckDB, SQL models break down each offense and defense, and the site shows where an opponent can be attacked, with every number tied to its sample size.",
    "summary": "",
    "overview": "My senior thesis asked one question about formation choice across 15 seasons of NFL play-by-play. I wanted to take the same data further and turn it into something a coaching staff could use every week: a scouting report on any opponent that rebuilds itself as the season goes.\n\nEvery Tuesday in season, R pulls the latest nflverse play-by-play, schedules, rosters, snap counts and injury reports into DuckDB. A chain of SQL models turns it into one row per play with situation flags, per-game tendencies, season-to-date and last-four-game totals, and league ranks among all 32 teams. An as-of snapshot means a Week 11 report only uses games played before Week 11. Data tests run after the models, and if any of them fails nothing is published, so the last good report stays live. GitHub Actions runs the pipeline, refreshes injuries, lines and weather through game day, and publishes to GitHub Pages.\n\nOn offense the site breaks down run and pass lean against what the situation calls for, early downs, third down by distance, the red zone, late-half and score-state splits, where each team runs and throws, who gets the ball and when, and formation tells under center versus shotgun, which carries the thesis question forward. On defense it shows EPA, success rate and yards allowed on runs versus dropbacks by situation, production allowed to receivers, tight ends and backs, the softest and toughest run lanes, blitz rate, box count and coverage.\n\nEach matchup gets scouting notes in two halves, stopping their offense and attacking their defense, plus an attack plan, a printable one-pager and a predictions tab. After every game, a report card grades each call the notes made against what happened.",
    "findingsTitle": "What a coach gets each week",
    "findings": [
      "Scouting notes that point to specific spots to exploit, such as a hot throw area, a run lean or the softest run lane, chosen once so the notes and the report card grade the same thing.",
      "Every number shows its sample, like “54 of 231” targets or “on 190 plays”. A “3 things to know” item needs a top or bottom 10% league rank on at least 30 plays.",
      "A predictions tab with an Elo win probability next to the market’s, locked before kickoff and graded afterward. It shows win probability only, because my backtest found no signal against the spread or total."
    ],
    "limitations": [
      "Public data has no full personnel or coverage charting for the current season. Blitz rate and box count come from FTN charting via nflverse, and man/zone coverage uses last season’s participation data.",
      "Early in the season samples are small; the site marks them rather than hiding them.",
      "Notes are drafted from the data each week and replaced by staff notes once those are written.",
      "Ranks use the current season only. Last season’s rank is shown for context, with a caveat when a team changed play callers."
    ],
    "contribution": "I designed and built the project: the definitions every model follows, the SQL models and data tests, the scouting notes and report card logic, the live site and the weekly automation.",
    "tools": [
      "R",
      "nflreadr",
      "SQL",
      "DuckDB",
      "Quarto",
      "JavaScript",
      "GitHub Actions",
      "GitHub Pages",
      "As-of (leakage-safe) joins",
      "Window functions",
      "Data tests",
      "Elo ratings"
    ],
    "dataSources": [
      {
        "name": "nflverse (nflreadr / nflfastR)",
        "coverage": "Play-by-play, schedules, rosters, snap counts, trades and official injury reports; 2026 season plus earlier seasons for league baselines",
        "refresh": "Weekly in season, with updates Thursday through Monday"
      },
      {
        "name": "FTN charting via nflverse",
        "coverage": "Blitz rate, box count and play action for the current season"
      },
      {
        "name": "nflverse schedule lines",
        "coverage": "Spread, total and moneylines for the betting trends and market win probability"
      },
      {
        "name": "Open-Meteo",
        "coverage": "Kickoff-hour forecast at each stadium"
      }
    ],
    "links": {
      "repository": "https://github.com/chrisantosiewicz/nfl-opponent-report",
      "demo": "https://chrisantosiewicz.github.io/nfl-opponent-report/"
    },
    "tags": [
      "R · SQL · DuckDB",
      "Automated weekly"
    ],
    "image": "assets/img/nfl-scout-bears.jpg",
    "imageAlt": "The live Bears scout page for Week 11 of 2026, scouting the New Orleans Saints offense for the Bears defense: injury flags for both teams, a note that data runs through Week 9 and only uses games before Week 11, and scouting notes that cite sample sizes such as 83 of 295 targets and 96 of 143 runs.",
    "imageCaption": "Live Bears scout page, Week 11 of 2026: the Saints offense, scouted for the Bears defense. Each number shows its sample and uses only games already played.",
    "imageCredit": "Screenshot from the live site. Data: nflverse.",
    "extraImages": [
      {
        "src": "assets/img/nfl-scout-home.jpg",
        "alt": "The scouting site home page with a grid of all 32 team logos to pick a team.",
        "caption": "Home page: pick your team to get its attack plan for this week’s opponent."
      }
    ]
  },
  {
    "title": "Shotgun or Under Center: NFL Formation Recommender",
    "category": "NFL",
    "status": "completed",
    "updated": "2026-05-08",
    "subtitle": "Machine-learning formation recommendations from 15 seasons of NFL play-by-play",
    "summary": "When should an NFL offense line up in shotgun versus under center? Using nflfastR play-by-play from 2011–2025, I built logistic regression, decision tree and Random Forest models plus a 10,000-run simulator. Under center converted 3rd-and-short more often every season, and the Shiny app ranks all four formation-play calls with uncertainty.",
    "overview": "Every NFL snap starts with a choice between shotgun and under center, yet that choice is usually driven by habit and scheme identity rather than situational evidence. Shotgun usage rose from 40.7% of run and pass plays in 2011 to 72.2% in 2023, but league-wide EPA per play showed no matching improvement, and 2023 was the lowest-EPA season in the sample. This project asks a narrower question: in which situations does each formation-play combination (Shotgun Pass, Shotgun Run, Under Center Pass, Under Center Run) produce better expected outcomes? Using public nflfastR play-by-play data, I first described 15 seasons of trends, then studied 3rd-and-short conversion, formation switching, and goal-line touchdown rates. Logistic regression and a tuned decision tree, trained on 2016–2023 and tested on 2024–2025, showed which game-state variables drive formation choice. Eight Random Forest models predict EPA and yards gained for each combination, using a lagged quarterback quality composite, scramble removal, a 10,000-draw residual simulation, and a sample-size reliability system that suppresses thinly supported recommendations. Single-play prediction is weak (EPA R² at most 0.012), but situation-level estimates are more useful (yards R² 0.76 across 150 test cells). The work is packaged as a Quarto site and a Shiny recommender app.",
    "contribution": "Sole author: this was my Syracuse University senior thesis (2026). I pulled and cleaned the data, ran the descriptive analysis, and built the logistic regression, decision tree and eight Random Forest models, the quarterback quality composite, the residual simulation and the reliability tiers. I validated on 2024–2025 and built the Shiny app, Quarto site, thesis and poster. Rodney Paul advised the project. The data and EPA/CPOE metrics come from nflverse/nflfastR.",
    "tools": [
      "R",
      "tidyverse/dplyr",
      "ggplot2",
      "nflfastR",
      "nflreadr",
      "randomForest",
      "rpart",
      "pROC",
      "caret",
      "xgboost (benchmark)",
      "boot",
      "Shiny",
      "shinydashboard",
      "shinyapps.io (rsconnect)",
      "Quarto",
      "Logistic regression",
      "Decision tree",
      "Random Forest",
      "Monte Carlo residual simulation",
      "Temporal train/test validation"
    ],
    "dataSources": [
      {
        "name": "nflfastR play-by-play (nflverse)",
        "sampleSize": "338,246 modeling plays (269,903 train / 68,343 test)",
        "refresh": "Updated in-season by nflverse; thesis models are static"
      }
    ],
    "findings": [
      "Shotgun share of NFL run/pass plays rose from 40.7% (2011) to a 72.2% peak (2023), while league EPA per play showed no matching gain; 2023 was the lowest-EPA season (−0.035). Descriptive, not causal.",
      "On 3rd down with 1–3 yards to go, under center converted more often than shotgun in every season 2011–2025: 64.5% vs 56.9% pooled (gap 7.6 pts, 95% CI 6.4–8.7; n = 29,050), peaking at 14.6 pts in 2022. Observational; affected by selection bias.",
      "Random Forest single-play R² was ≤0.012 for EPA on 2024–25 test data, but across 150 situation cells the simulation reached EPA R² 0.315 (RMSE 0.210) and yards R² 0.760 (MAE 0.608 yd). The recommender matched the best observed call in 42 of 64 down-distance cells (65.6%)."
    ],
    "limitations": [
      "Observational data: formation choice is not random (selection bias)",
      "No defensive personnel, offensive personnel, motion, or play-action flags in public data",
      "nflfastR counts pistol as shotgun",
      "Models trained on 2016–2023 may lag current tactics; retraining is planned, not done",
      "Single-play predictive power is very low; Under Center Pass and medium-distance EPA estimates are unreliable",
      "Each play is optimized in isolation, with no drive- or game-level strategy"
    ],
    "links": {
      "repository": null,
      "report": null,
      "demo": "https://chrisantosiewicz.shinyapps.io/nfl-formation-recommender/"
    },
    "tags": [
      "Senior thesis",
      "R · Shiny"
    ],
    "image": "assets/img/thesis-third-short.png",
    "imageAlt": "Line chart of NFL 3rd-and-short conversion rates from 2011 to 2025. The olive under center line sits above the light shotgun line in every season, peaking at 70.4% in 2022 and ending at 64.4% in 2025; shotgun ranges from about 52% to 61% and ends at 58.1%. A callout marks the 14.6-point gap in 2022.",
    "imageCaption": "Under center has converted 3rd-and-1 to 3rd-and-3 more often than shotgun in every season since 2011, peaking at a 14.6-point edge in 2022. The rates are observational: coaches choose when to line up under center.",
    "imageCredit": "Data: nflfastR play-by-play (nflverse). Analysis and chart: Chris Antosiewicz, Syracuse University senior thesis (2026).",
    "extraImages": [
      {
        "src": "assets/img/thesis-shiny.png",
        "alt": "Shiny app example with formation rankings, simulated EPA distributions and uncertainty ranges for third-and-two near the goal line.",
        "caption": "Product example: simulated recommendations, not observed conversion rates. “Yard Line 98” denotes the opponent’s two-yard line in this app."
      }
    ],
    "artifactLinks": [],
    "slug": "nfl-formation-recommender",
    "sport": "NFL",
    "card": "When should an NFL offense line up in shotgun or under center? I modeled 15 seasons of nflfastR play-by-play in R and built a Shiny app that ranks formation and play calls for any situation. Under center converted 3rd-and-short more often in every season."
  },
  {
    "title": "MLB Next-Pitch Model and Matchup Report",
    "category": "MLB",
    "status": "in progress",
    "updated": "2026-10-12",
    "subtitle": "Predicting pitch type from game context, tested on 2026.",
    "summary": "Can game context predict the next pitch better than a pitcher’s usual mix? A pre-registered 2026 test of 711,703 pitches found 44.7% exact-pitch accuracy for XGBoost, versus 37.2% for a shrunk prior-season mix and 40.1% for a current-form plus platoon baseline.",
    "overview": "Using public Statcast data from 2023–2026, this project turns pitch-type predictions into a Shiny matchup app and an advance report. The cleaned dataset contains 2,854,374 regular-season pitches. Models were trained on 2023–24, tuned on 2025, refit on 2023–25, then scored once on 2026 under a written pre-registration. A known-when data dictionary supports leakage controls. Empirical-Bayes pitch-mix baselines are compared with ridge multinomial logistic regression and XGBoost; uncertainty uses 500 game-level bootstrap resamples. The model, app, report and write-up are built; scheduled refresh and retraining remain planned.",
    "contribution": "I designed the study and the evaluation rules, chose the modeling and data-split decisions, ran the modeling experiments, directed the app and report design, and reviewed each phase.",
    "tools": [
      "R",
      "baseballr",
      "DuckDB",
      "arrow",
      "XGBoost",
      "Shiny",
      "Quarto",
      "Empirical-Bayes shrinkage",
      "Game-level bootstrap"
    ],
    "findings": [
      "2026 held-out test, 711,703 pitches: XGBoost log loss 1.283 versus 1.580 for the shrunk prior-season mix and 1.390 for the current-form plus platoon mix. Difference versus prior-season mix: −0.297 (95% game-bootstrap interval −0.301 to −0.293).",
      "Exact-pitch accuracy: 44.7% for XGBoost, 37.2% for the prior-season mix and 40.1% for the current-form plus platoon mix. These are distinct benchmarks.",
      "Per-pitch-type expected calibration error was at most 0.4 percentage points. This is an average calibration measure, not a guarantee that every probability bin is within 0.4 points. Context improved log loss for 98% of 468 pitchers with at least 500 pitches."
    ],
    "limitations": [
      "One held-out season; pitch type is predicted, not location.",
      "Pitch labels come from Savant’s classifier, with only partial relabel repair. Per-pitcher and per-count results have no confidence intervals.",
      "In-game adaptation results are post hoc; single-game postseason tests are not headline evidence.",
      "Scheduled acquisition, scoring and retraining are planned, not built."
    ],
    "dataSources": [
      {
        "name": "MLB Statcast via Baseball Savant and baseballr",
        "coverage": "2023–2026 regular seasons; 2022 history only. Data through 2026-09-27.",
        "sampleSize": "2,854,374 cleaned pitches; 711,703 in the 2026 test.",
        "refresh": "Manual pull; automation planned."
      }
    ],
    "links": {
      "repository": "https://github.com/chrisantosiewicz/mlb-pitch-prediction",
      "report": "https://chrisantosiewicz.github.io/mlb-pitch-prediction/",
      "demo": "https://chrisantosiewicz.shinyapps.io/mlb-matchup-report/"
    },
    "artifactLinks": [
      {
        "label": "Sample matchup report (PDF)",
        "url": "https://chrisantosiewicz.github.io/mlb-pitch-prediction/files/sample_skenes_ohtani.pdf"
      },
      {
        "label": "Pre-registration",
        "url": "https://github.com/chrisantosiewicz/mlb-pitch-prediction/blob/main/docs/preregistration.md"
      }
    ],
    "image": "assets/img/mlb-calibration.png",
    "imageAlt": "Eight calibration panels for the held-out 2026 season. XGBoost in red and the L3 current-form plus platoon mix baseline in blue are compared with the perfect-calibration diagonal.",
    "imageCaption": "Original 2026 calibration figure, unchanged. The blue line is the L3 current-form plus platoon mix baseline; the red line is XGBoost. Bins with fewer than 200 pitches are hidden.",
    "imageCredit": "Data: MLB Statcast via Baseball Savant.",
    "tags": [
      "R · XGBoost",
      "Shiny"
    ],
    "slug": "mlb-next-pitch-model",
    "sport": "MLB",
    "card": "Predicting the next pitch type from game context on 2.85 million Statcast pitches. On a preregistered 2026 test, XGBoost hit 44.7% exact-pitch accuracy versus 37.2% for a pitcher’s usual mix. Includes a Shiny matchup app and an advance report."
  },
  {
    "title": "NFL Game Forecasting Model",
    "category": "NFL",
    "status": "in progress",
    "updated": "2026-10-16",
    "subtitle": "Better than Elo, still behind the market, and reported that way.",
    "summary": "Can historical team performance improve NFL forecasts beyond ratings and market reference lines? Using season-by-season testing, leakage controls, and paired bootstrap comparisons, this project evaluates Elo and ridge models. Ridge improved on Elo but underperformed the line-implied benchmark. A larger tuning grid did not help; sensitivity validation remains unfinished.",
    "overview": "Can prior-game team performance forecast NFL scoring margins and totals better than Elo ratings, and can it get anywhere near the market? A more complex model can beat a simple baseline without giving any betting advantage, so I set the evaluation rules before running anything.\n\nThe data combines nflverse schedules, final scores, reference spread and total lines, and nflfastR play-by-play features. Each season from 2018 to 2024 is predicted using only earlier seasons for fitting and tuning. The pooled comparison covers 1,675 games from 2019–2024; 2018 is reported separately, and 2025 is locked as a final holdout that has not been touched.\n\nSeparate ridge regressions predict home margin and total from 44 registered team-form and Elo features. A discretized normal turns those into moneyline, spread-cover and over probabilities. A new model only replaces the old one if the paired bootstrap interval (10,000 season-week resamples) for the pooled three-market log loss sits entirely below zero, and no single market gets worse.\n\nRidge beat Elo and a constant baseline but stayed worse than the line-implied benchmark in all three markets. A larger tuning grid made it worse. Five quarterback-feature candidates were then tested against ridge with a Holm correction, and none was promoted. The garbage-time sensitivity check, run at three settings, changed none of these conclusions. This is disciplined model evaluation, not a betting edge.",
    "contribution": "I set the research question, the evaluation method, the preregistered promotion rule and the locked 2025 holdout. I decided which candidates to test and promote, and ran the long model runs.",
    "tools": [
      "Python",
      "NumPy",
      "Polars",
      "nflreadpy",
      "Matplotlib",
      "pytest",
      "Elo",
      "Ridge regression",
      "Walk-forward validation",
      "Paired bootstrap",
      "Holm correction"
    ],
    "dataSources": [
      {
        "name": "nflverse schedules, scores and reference lines",
        "coverage": "2017 for training history; 2018–2024 for development; 2019–2024 for the pooled evaluation",
        "sample": "1,675 pooled games, plus 267 games from 2018 reported separately",
        "refresh": "Frozen historical snapshots"
      },
      {
        "name": "nflfastR play-by-play (nflverse)",
        "coverage": "2017–2024",
        "refresh": "Frozen historical snapshots"
      },
      {
        "name": "The Odds API (separate live-market component)",
        "coverage": "First NFL snapshot on October 2, 2026. Not used in the historical findings or the figure."
      }
    ],
    "findings": [
      {
        "finding": "Ridge improved on Elo",
        "period": "2019–2024",
        "nGames": 1675,
        "units": "Pooled three-market log-loss difference, nats per game",
        "comparison": "Ridge minus Elo",
        "estimate": -0.0215,
        "confidenceInterval95": [
          -0.0338,
          -0.0094
        ],
        "limitation": "Development comparison; 2018 excluded. Unchanged under all three garbage-time settings."
      },
      {
        "finding": "Ridge underperformed the line-implied reference",
        "period": "2019–2024",
        "nGames": 1675,
        "units": "Pooled three-market log-loss difference, nats per game",
        "comparison": "Ridge minus line-implied benchmark",
        "estimate": 0.0606,
        "confidenceInterval95": [
          0.0423,
          0.0787
        ],
        "limitation": "Reference bookmaker and capture time unknown; not a decision-time price or profitability test."
      },
      {
        "finding": "Expanding the tuning grid worsened the candidate",
        "period": "2019–2024",
        "nGames": 1675,
        "units": "Pooled three-market log-loss difference, nats per game",
        "comparison": "375-point grid minus original 99-point ridge",
        "estimate": 0.026,
        "confidenceInterval95": [
          0.0174,
          0.0348
        ],
        "limitation": "Adaptively proposed after observing the original grid edge; not promoted."
      }
    ],
    "limitations": [
      "These are development results: no profit, ROI, closing-line value or betting edge is claimed.",
      "The model loses to the market in every market tested.",
      "The 2025 holdout is still locked for a single final evaluation.",
      "Reference lines have an unknown bookmaker and capture time, so this is not a test against decision-time prices.",
      "2018 uses default settings and in-sample sigma and is left out of pooled comparisons.",
      "The EPA model’s training years overlap the evaluation years, and early training samples are small.",
      "LightGBM is planned only if a later step justifies it."
    ],
    "links": {
      "repository": null,
      "report": null,
      "demo": null
    },
    "tags": [
      "Python",
      "Walk-forward validation"
    ],
    "image": "assets/img/nfl-forecast-loglos.svg",
    "imageAlt": "Dot plot of pooled three-market log loss with 95% intervals on 1,675 NFL games, 2019–2024. Lower is better. Line-implied benchmark 1.968, ridge 2.029, Elo 2.050, expanded-grid ridge 2.055, constant 2.134.",
    "imageCaption": "Pooled three-market log loss, 2019–2024, with 95% season-week bootstrap intervals. Ridge beats Elo and the constant baseline; the market’s lines beat everything.",
    "imageCredit": "Data: nflverse / nflfastR. Chart drawn from the stored evaluation results.",
    "slug": "nfl-forecast-benchmarks",
    "sport": "NFL",
    "card": "A walk-forward test of NFL game forecasts on 1,675 games from 2019–2024. My ridge model beat Elo but not the market’s lines, and five quarterback add-ons failed the promotion rule. The Elo ratings now feed the scouting site’s predictions."
  },
  {
    "title": "MLS Partnership Tracker",
    "category": "Sponsorship",
    "status": "in progress",
    "updated": "2026-10-25",
    "subtitle": "A sourced view of club partnerships and public attention.",
    "summary": "Which brands partner with MLS clubs, and what draws attention around matches and new deals? This project connects partnership research with a planned public-attention pipeline. The current foundation includes a club reference list and Python/DuckDB data tests, with versioned sponsorship records and attention analysis in development.",
    "image": "assets/img/mls-research-design.svg",
    "imageAlt": "MLS Partnership Tracker research design: source major partnerships, structure a versioned history, and explore public attention. These are planned pipeline stages. The current foundation is a club reference list and Python/DuckDB test runner.",
    "imageCaption": "Research design, not a results chart. The partnership dataset and attention pipeline are in development; no sponsorship findings or live tracking are represented here.",
    "imageCredit": "Research design: Chris Antosiewicz.",
    "overview": "Which product categories sponsor MLS clubs, and how does public attention to clubs and sponsor brands change around matches and new deals? This project aims to build a sourced, versioned view of major partnerships as a starting point for partnership research. Public attention is a proxy for interest, not a measure of sponsor value.\n\nThe initial scope covers front-of-kit, sleeve, and stadium naming partnerships. So far there is a club reference table, a project scaffold and a Python/DuckDB test runner. Sponsor research and the wider pipeline are in development.\n\nPlanned work includes source URLs and check dates for partnership records, historical partnership versions for as-of joins, Wikimedia pageview ingestion, MLS schedule ingestion, a trailing attention baseline, match-day lift, and a Quarto page rebuilt with GitHub Actions. There are no supported findings or real chart exports yet.",
    "findings": [
      "No findings yet. Sponsor records and pageview data have not been collected, and charts made from synthetic test data are left out on purpose."
    ],
    "limitations": [
      "Wikipedia pageviews measure public attention, not sponsorship value, attribution, or return on investment.",
      "The initial scope covers kit-front, sleeve, and stadium naming partners rather than complete partner lists. Deal values will be labeled reported and included only when a source states them.",
      "Club Wikipedia article titles remain unverified; redirects may affect view counts.",
      "Sponsor data, ingestion, SQL models, daily workflows, charts, and a live page remain unfinished or unverified. A daily pipeline is planned, not operating.",
      "Planned analyses are described in the project brief; there is no formal public pre-registration."
    ],
    "contribution": "I wrote the project brief, research questions, design, data-source requirements and schedule, and set the rules for what the project may claim. I set up the repository, chose the license and a pull-request review workflow, and own the review of each step.",
    "tools": [
      "Git / GitHub",
      "Python",
      "DuckDB",
      "Zero-row data-quality tests",
      "Versioned CSV files"
    ],
    "plannedTools": [
      "SQL models and type 2 partnership history",
      "Wikimedia pageview and MLS schedule ingestion",
      "Trailing attention baseline and match-day lift",
      "Quarto publishing",
      "GitHub Actions daily rebuild"
    ],
    "dataSources": [
      {
        "name": "Club reference CSV",
        "coverage": "MLS club reference list for the 2026 season; Wikipedia titles not yet verified",
        "refresh": "Manual"
      },
      {
        "name": "Partnership records",
        "coverage": "Hand-researched club and brand announcements planned; sponsor rows not committed at handoff",
        "refresh": "Manual, versioned, with a source URL and check date per record planned"
      },
      {
        "name": "Wikimedia Pageviews API",
        "coverage": "Planned public-attention input; not yet collected",
        "refresh": "Daily refresh planned, not live"
      },
      {
        "name": "American Soccer Analysis schedules",
        "coverage": "Planned match-date input; ingestion not yet verified",
        "refresh": "Daily refresh planned, not live"
      }
    ],
    "links": {},
    "tags": [
      "Soccer · MLS",
      "Partnership research"
    ],
    "slug": "mls-partnership-tracker",
    "sport": "MLS",
    "card": "A sourced, versioned database of MLS club partnerships, set up to measure public attention around matches and new deals. In progress: the club reference data and a tested pipeline scaffold are built. No findings yet."
  }
];
