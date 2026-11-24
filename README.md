---
license: cc-by-4.0
language:
- he
- en
task_categories:
- text-classification
pretty_name: Hebrew and English inquiry routing test set
size_categories:
- n<1K
tags:
- hebrew
- routing
- evaluation
- customer-support
---

# Hebrew and English inquiry routing test set

18 synthetic business inquiries in Hebrew, English and mixed Hebrew-English. Each one is labelled with the team it should reach, or `review` when a person should decide. Use it to test an inquiry-routing rule set or an AI classifier **before** it touches real customer messages.

The cases include the hard ones:

| Case type | Count | What it tests |
| --- | --- | --- |
| clear | 8 | The baseline |
| mixed-language | 3 | Hebrew and English in one message |
| missing-scope | 2 | Too little detail to route, so it goes to review |
| negation | 2 | The message rules something out ("We do not need a redesign…") and asks for something else |
| instruction-like-text | 2 | Text that tries to tell the classifier what to do |
| multiple-intents | 1 | Two requests in one message, so it goes to review |

Routes: `automation` 6, `review` 5, `ai` 3, `websites` 2, `software` 2. `ai` means the task needs a model to interpret text; `automation` means a fixed rule is enough. Languages: Hebrew 11, English 4, mixed 3.

## Files

- `data/inquiry-routing-dataset.csv` (UTF-8 with BOM, so Excel shows the Hebrew)
- `data/inquiry-routing-dataset.json`

Fields: `id`, `language`, `message`, `expected_route`, `case_type`, `label_reason`.

## Score your router

Write your predictions as a CSV with `id,route`, then:

```sh
node score.mjs predictions.csv
```

It prints accuracy overall and per case type, and lists every miss. A router that sends an unclear case to `review` instead of guessing is doing the right thing, so `review` is a real answer, not a failure.

## Limits

The messages are invented and few. Passing this set does not show a router is ready. It shows it handles these hard shapes. Add your own anonymised cases before deciding.

## Who made this

[yishai.xyz](https://yishai.xyz/en/) is a technology studio in Israel that builds websites, custom software and business automation with AI, in Hebrew and English. Background: [Using AI to triage inquiries in Hebrew](https://yishai.xyz/en/guides/ai-inquiry-triage/) ([בעברית](https://yishai.xyz/guides/ai-inquiry-triage/)) and the [dataset page on yishai.xyz](https://yishai.xyz/en/resources/inquiry-routing-dataset/).

Licence: CC BY 4.0. Credit "yishai.xyz" with a link to https://yishai.xyz/en/.

---

# מאגר בדיקות לניתוב פניות בעברית ובאנגלית

18 פניות עסקיות מומצאות בעברית, באנגלית ובשילוב של שתיהן, כל אחת עם הצוות שאליו היא צריכה להגיע, או `review` כשאדם צריך להחליט. משתמשים בו כדי לבדוק כללי ניתוב או מסווג AI לפני שהם נוגעים בפניות אמיתיות. [המדריך בעברית](https://yishai.xyz/guides/ai-inquiry-triage/) · [המאגר באתר](https://yishai.xyz/resources/inquiry-routing-dataset/)
