# Blogposts Generator

This is a script that generates a markdown formatted post written in the style of
a blog. It writes about a trending topic scraped from [Google Trends](https://trends.google.com/trends/trendingsearches/daily?geo=US&hl=en-US).

## How

The script works by scraping the Google Trends website using [Playwright](https://playwright.dev).
After it finds the today's trending topic, the script calls out to the [OpenAI API](https://platform.openai.com/docs/introduction),
prompting ChatGPT to generate a markdown formatted blogpost. Finally, it uploads
the generated blogpost to an instance of [Ghost](https://ghost.org)
via the Ghost Admin API.

## Deployment

This script is intented to be run as a Kubernetes Cron Job. You can find that job
[here](https://github.com/joshsizer/flux-root/blob/d08e01348773f15bbc10fcbaa4b51314920c5d10/linode/ystonedev/us-east/green/tenants/blogposts-generator.yaml).
