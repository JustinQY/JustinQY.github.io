# Navfolio Migration Report

## Summary

- Source project: Hexo blog at `/Users/qiaoyibo/qyb_blog`.
- Target foundation: Astro Navfolio from `dodolalorc/astro-navfolio`.
- Posts found: 61
- Posts migrated: 61
- Posts failed: 0
- Assets copied: 52
- Missing image/assets references: 1 (source missing; Markdown reference replaced with TODO text to avoid a broken image)

## Routing Strategy

- Current Hexo URLs are not preserved because the rebuild intentionally adopts Navfolio routing.
- Migrated articles live under `/blog/[slug]/` using stable ASCII slugs derived from the old relative post path.
- Old Hexo categories/tags are mapped into Navfolio blog frontmatter as `categories` and merged `tags`.

## Migrated Posts

- `source/_posts/AI/CV/CNN.md` -> `src/content/blog/ai-cv-cnn.md`
- `source/_posts/AI/CV/convolutional_neural_network.md` -> `src/content/blog/ai-cv-convolutional-neural-network.md`
- `source/_posts/AI/CV/face_recognition.md` -> `src/content/blog/ai-cv-face-recognition.md`
- `source/_posts/AI/CV/image_classifier.md` -> `src/content/blog/ai-cv-image-classifier.md`
- `source/_posts/AI/CV/neural_style_transfer.md` -> `src/content/blog/ai-cv-neural-style-transfer.md`
- `source/_posts/AI/CV/object_detection.md` -> `src/content/blog/ai-cv-object-detection.md`
- `source/_posts/AI/Interview/IBMinterviewrecords.md` -> `src/content/blog/ai-interview-ibminterviewrecords.md`
- `source/_posts/AI/Interview/coop_interview_prepare.md` -> `src/content/blog/ai-interview-coop-interview-prepare.md`
- `source/_posts/AI/Models.md` -> `src/content/blog/ai-models.md`
- `source/_posts/AI/NLP/BERT_reading.md` -> `src/content/blog/ai-nlp-bert-reading.md`
- `source/_posts/AI/NLP/RNN.md` -> `src/content/blog/ai-nlp-rnn.md`
- `source/_posts/AI/NLP/sentiment_analysis_record.md` -> `src/content/blog/ai-nlp-sentiment-analysis-record.md`
- `source/_posts/AI/NLP/tvshow_script_generation.md` -> `src/content/blog/ai-nlp-tvshow-script-generation.md`
- `source/_posts/AI/NLP/word_embeddings.md` -> `src/content/blog/ai-nlp-word-embeddings.md`
- `source/_posts/AI/Projects/LangChain.md` -> `src/content/blog/ai-projects-langchain.md`
- `source/_posts/AI/Projects/RAG_QAbot.md` -> `src/content/blog/ai-projects-rag-qabot.md`
- `source/_posts/AI/RAG/RAG_from_scratch.md` -> `src/content/blog/ai-rag-rag-from-scratch.md`
- `source/_posts/AI/deep_learning/Neural_Network/neural_network_model.md` -> `src/content/blog/ai-deep-learning-neural-network-neural-network-model.md`
- `source/_posts/AI/kaggle/Kaggle做题记录和题目索引.md` -> `src/content/blog/ai-kaggle-kaggle.md`
- `source/_posts/AI/kaggle/kaggle新手入门指北.md` -> `src/content/blog/ai-kaggle-kaggle-2.md`
- `source/_posts/AI/machine_learning/algo_for_unsupervised.md` -> `src/content/blog/ai-machine-learning-algo-for-unsupervised.md`
- `source/_posts/AI/machine_learning/data_preprocess.md` -> `src/content/blog/ai-machine-learning-data-preprocess.md`
- `source/_posts/AI/machine_learning/data_types.md` -> `src/content/blog/ai-machine-learning-data-types.md`
- `source/_posts/AI/machine_learning/decision_tree.md` -> `src/content/blog/ai-machine-learning-decision-tree.md`
- `source/_posts/AI/machine_learning/linear_regression.md` -> `src/content/blog/ai-machine-learning-linear-regression.md`
- `source/_posts/AI/machine_learning/logistic_regression.md` -> `src/content/blog/ai-machine-learning-logistic-regression.md`
- `source/_posts/AI/machine_learning/math_in_ML.md` -> `src/content/blog/ai-machine-learning-math-in-ml.md`
- `source/_posts/AI/machine_learning/model_evaluation.md` -> `src/content/blog/ai-machine-learning-model-evaluation.md`
- `source/_posts/AI/machine_learning/optimizing_gradient_descent.md` -> `src/content/blog/ai-machine-learning-optimizing-gradient-descent.md`
- `source/_posts/AI/machine_learning/plots_in_ML.md` -> `src/content/blog/ai-machine-learning-plots-in-ml.md`
- `source/_posts/AI/machine_learning/recommender_system.md` -> `src/content/blog/ai-machine-learning-recommender-system.md`
- `source/_posts/AI/machine_learning/代填坑项目.md` -> `src/content/blog/ai-machine-learning.md`
- `source/_posts/Cloud/AWS.md` -> `src/content/blog/cloud-aws.md`
- `source/_posts/Cloud/AWS_Services/AWS_basic_services.md` -> `src/content/blog/cloud-aws-services-aws-basic-services.md`
- `source/_posts/Interview/self_introduction_bq.md` -> `src/content/blog/interview-self-introduction-bq.md`
- `source/_posts/backend/FastAPI.md` -> `src/content/blog/backend-fastapi.md`
- `source/_posts/iOS/Objective-C.md` -> `src/content/blog/ios-objective-c.md`
- `source/_posts/iOS/iOS_MJExtension.md` -> `src/content/blog/ios-ios-mjextension.md`
- `source/_posts/iOS/iOS_MRC与ARC.md` -> `src/content/blog/ios-ios-mrc-arc.md`
- `source/_posts/iOS/iOS_NSThread.md` -> `src/content/blog/ios-ios-nsthread.md`
- `source/_posts/iOS/iOS_ObjectiveC小记.md` -> `src/content/blog/ios-ios-objectivec.md`
- `source/_posts/iOS/iOS_UICollectionView学习笔记.md` -> `src/content/blog/ios-ios-uicollectionview.md`
- `source/_posts/iOS/iOS_UI控件.md` -> `src/content/blog/ios-ios-ui.md`
- `source/_posts/iOS/iOS_datarace.md` -> `src/content/blog/ios-ios-datarace.md`
- `source/_posts/iOS/iOS_deadlock.md` -> `src/content/blog/ios-ios-deadlock.md`
- `source/_posts/iOS/iOS_gcd.md` -> `src/content/blog/ios-ios-gcd.md`
- `source/_posts/iOS/iOS_pthread.md` -> `src/content/blog/ios-ios-pthread.md`
- `source/_posts/iOS/iOS_单例模式.md` -> `src/content/blog/ios-ios.md`
- `source/_posts/iOS/iOS_观察者模式.md` -> `src/content/blog/ios-ios-2.md`
- `source/_posts/iOS/iOS网络之多线程.md` -> `src/content/blog/ios-ios-3.md`
- `source/_posts/iOS/iOS面试题记录.md` -> `src/content/blog/ios-ios-4.md`
- `source/_posts/markdown/markdown常用语法总结.md` -> `src/content/blog/markdown-markdown.md`
- `source/_posts/python/basic.md` -> `src/content/blog/python-basic.md`
- `source/_posts/python/math_formula.md` -> `src/content/blog/python-math-formula.md`
- `source/_posts/python/numpy.md` -> `src/content/blog/python-numpy.md`
- `source/_posts/python/pandas.md` -> `src/content/blog/python-pandas.md`
- `source/_posts/python/plotting.md` -> `src/content/blog/python-plotting.md`
- `source/_posts/python/scikit_learn.md` -> `src/content/blog/python-scikit-learn.md`
- `source/_posts/python/tensorflow_pytorch.md` -> `src/content/blog/python-tensorflow-pytorch.md`
- `source/_posts/python/terms_in_python_programming.md` -> `src/content/blog/python-terms-in-python-programming.md`
- `source/_posts/python/virtual_environment.md` -> `src/content/blog/python-virtual-environment.md`

## Failed Posts

- None

## Missing Fields

- None

## Missing Images / Assets

- src/content/blog/ai-machine-learning-data-preprocess.md: `/img/screencatch/handle_missing_values.png` (checked: themes/icarus/source/img/screencatch/handle_missing_values.png, source/img/screencatch/handle_missing_values.png, source/img/screencatch/handle_missing_values.png)

## Copied Assets

- `public/img/screencatch/langchain_products_architecture.png` -> `/images/blog/screencatch/langchain_products_architecture.png`
- `public/img/screencatch/message_structure.png` -> `/images/blog/screencatch/message_structure.png`
- `public/img/screencatch/langsmith.png` -> `/images/blog/screencatch/langsmith.png`
- `themes/icarus/source/img/tesla.jpg` -> `/images/blog/tesla.jpg`
- `themes/icarus/source/img/convolutional_neural_network.jpeg` -> `/images/blog/convolutional_neural_network.jpeg`
- `themes/icarus/source/img/face_recognition_1.jpeg` -> `/images/blog/face_recognition_1.jpeg`
- `themes/icarus/source/img/computer_vision_1.jpeg` -> `/images/blog/computer_vision_1.jpeg`
- `themes/icarus/source/img/carrace.jpg` -> `/images/blog/carrace.jpg`
- `themes/icarus/source/img/object_detection_1.jpeg` -> `/images/blog/object_detection_1.jpeg`
- `themes/icarus/source/img/screencatch/conv_implementation_sliding_windows.png` -> `/images/blog/screencatch/conv_implementation_sliding_windows.png`
- `themes/icarus/source/img/screencatch/object_detection_vs_semantic_segmentation.png` -> `/images/blog/screencatch/object_detection_vs_semantic_segmentation.png`
- `themes/icarus/source/img/screencatch/what_segmentation_does.png` -> `/images/blog/screencatch/what_segmentation_does.png`
- `themes/icarus/source/img/screencatch/semantic_segmentation.png` -> `/images/blog/screencatch/semantic_segmentation.png`
- `themes/icarus/source/img/screencatch/U_Net.png` -> `/images/blog/screencatch/U_Net.png`
- `themes/icarus/source/img/openai.jpg` -> `/images/blog/openai.jpg`
- `themes/icarus/source/img/chatgpt.jpg` -> `/images/blog/chatgpt.jpg`
- `source/_posts/AI/RAG/multi-query_intuition.png` -> `/images/blog/ai-rag-rag-from-scratch/multi-query_intuition.png`
- `source/_posts/AI/RAG/parallelized_retrieval.png` -> `/images/blog/ai-rag-rag-from-scratch/parallelized_retrieval.png`
- `themes/icarus/source/img/ai.jpg` -> `/images/blog/ai.jpg`
- `themes/icarus/source/img/pythonnotebook.jpg` -> `/images/blog/pythonnotebook.jpg`
- `themes/icarus/source/img/screencatch/competition_filter.png` -> `/images/blog/screencatch/competition_filter.png`
- `themes/icarus/source/img/screencatch/competition_overview.png` -> `/images/blog/screencatch/competition_overview.png`
- `themes/icarus/source/img/screencatch/competition_data_description.png` -> `/images/blog/screencatch/competition_data_description.png`
- `themes/icarus/source/img/screencatch/competition_evaluation.png` -> `/images/blog/screencatch/competition_evaluation.png`
- `themes/icarus/source/img/screencatch/competition_create_collection.png` -> `/images/blog/screencatch/competition_create_collection.png`
- `themes/icarus/source/img/screencatch/competition_collection_check.png` -> `/images/blog/screencatch/competition_collection_check.png`
- `themes/icarus/source/img/screencatch/competition_create_notebook.png` -> `/images/blog/screencatch/competition_create_notebook.png`
- `themes/icarus/source/img/screencatch/competition_notebook_rename.png` -> `/images/blog/screencatch/competition_notebook_rename.png`
- `themes/icarus/source/img/screencatch/add_notebook_to_collection.png` -> `/images/blog/screencatch/add_notebook_to_collection.png`
- `themes/icarus/source/img/self_driving_cars_1.jpeg` -> `/images/blog/self_driving_cars_1.jpeg`
- `themes/icarus/source/img/onehole.jpg` -> `/images/blog/onehole.jpg`
- `themes/icarus/source/img/cheese.jpg` -> `/images/blog/cheese.jpg`
- `themes/icarus/source/img/screencatch/logistic_loss_function.png` -> `/images/blog/screencatch/logistic_loss_function.png`
- `themes/icarus/source/img/toolandpaper.jpg` -> `/images/blog/toolandpaper.jpg`
- `source/_posts/AI/machine_learning/img.png` -> `/images/blog/ai-machine-learning-math-in-ml/img.png`
- `themes/icarus/source/img/teslacharging.jpg` -> `/images/blog/teslacharging.jpg`
- `themes/icarus/source/img/desk.jpg` -> `/images/blog/desk.jpg`
- `themes/icarus/source/img/spiderman.jpg` -> `/images/blog/spiderman.jpg`
- `source/_posts/Cloud/img.png` -> `/images/blog/cloud-aws/img.png`
- `source/_posts/Cloud/AWS_Services/img.png` -> `/images/blog/cloud-aws-services-aws-basic-services/img.png`
- `source/_posts/Cloud/AWS_Services/img_1.png` -> `/images/blog/cloud-aws-services-aws-basic-services/img_1.png`
- `source/_posts/Cloud/AWS_Services/img_2.png` -> `/images/blog/cloud-aws-services-aws-basic-services/img_2.png`
- `source/_posts/Cloud/AWS_Services/img_3.png` -> `/images/blog/cloud-aws-services-aws-basic-services/img_3.png`
- `source/_posts/Cloud/AWS_Services/img_4.png` -> `/images/blog/cloud-aws-services-aws-basic-services/img_4.png`
- `source/_posts/Cloud/AWS_Services/img_5.png` -> `/images/blog/cloud-aws-services-aws-basic-services/img_5.png`
- `source/_posts/Cloud/AWS_Services/img_7.png` -> `/images/blog/cloud-aws-services-aws-basic-services/img_7.png`
- `themes/icarus/source/img/iPhone.jpg` -> `/images/blog/iPhone.jpg`
- `source/img/deadlockdiy.jpg` -> `/images/blog/deadlockdiy.jpg`
- `themes/icarus/source/img/icecream.jpg` -> `/images/blog/icecream.jpg`
- `themes/icarus/source/img/network.jpg` -> `/images/blog/network.jpg`
- `themes/icarus/source/img/pythonlanguage.jpg` -> `/images/blog/pythonlanguage.jpg`
- `themes/icarus/source/img/screencatch/plot_from_coursera.png` -> `/images/blog/screencatch/plot_from_coursera.png`

## Manual TODO Items

- TODO: Restore or recreate `handle_missing_values.png` if that visual is still needed in `ai-machine-learning-data-preprocess.md`.
- TODO: Replace TODO@example.com with a verified email address or remove email links.
- TODO: Add resume URL if one should appear on the site.
- TODO: Add verified project repositories/demos for project entries.
- TODO: Review migrated post slugs if preserving old Hexo URLs matters later; current migration follows Navfolio /blog/[slug]/ routing.

## Verification Performed

- Content build: `ASTRO_TELEMETRY_DISABLED=1 SITE_URL=https://justinqy.github.io SITE_BASE=/ npx astro build` completed successfully.
- Search index: `npx pagefind --site dist --output-subdir pagefind --root-selector main --exclude-selectors "[data-pagefind-ignore]"` indexed 100 pages.
- Content asset check: 69 real Markdown/frontmatter image references checked; no old `/img/` references and no missing migrated assets remain.
- Route check: `/`, `/blog/`, `/blog/python-scikit-learn/`, `/projects/`, `/about/`, `/vibe/`, and `/rss.xml` exist in `dist`.
- Browser smoke test: desktop and mobile checks returned HTTP 200, no broken images, no 404 assets, no horizontal overflow, and Pagefind search opened with `Python` results.
- Generated local-only font files: `scripts/fonts/ui-chars.txt` and `public/fonts/lxgw-ui-subset.woff2` were generated for preview/build verification and remain ignored by Git per Navfolio defaults.

## Local Verification Notes

- Bun is not installed in this local environment, so verification used npm/npx equivalents for Astro and Pagefind.
- The GitHub Pages workflow keeps the Navfolio Bun build path and installs Python `fonttools`/`brotli` before `bun run build`, so deployment can generate the ignored font subset during CI.

## Local Development

```bash
bun install
bun run dev
```

## Production Build

```bash
SITE_URL=https://justinqy.github.io SITE_BASE=/ bun run build
bun run preview
```

## GitHub Pages Deployment

The Navfolio GitHub Pages workflow is preserved and adjusted to build this repository's own content. For the `JustinQY.github.io` user page, use:

- `SITE_URL=https://justinqy.github.io`
- `SITE_BASE=/`

Push to `main` after reviewing staged files and ensuring old Hexo generated files are not included unintentionally.
