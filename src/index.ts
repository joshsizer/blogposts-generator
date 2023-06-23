import { Configuration, OpenAIApi } from "openai";
import { exit } from "process";

const TRENDING_URL: string = process.env.TRENDING_URL ? process.env.TRENDING_URL as string : ""
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY as string : ""
const OPENAI_MODEL: string = process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL as string : "gpt-3.5-turbo"

if (!TRENDING_URL) {
    console.log("No TRENDING_URL provided. Exiting.")
    exit(1)
}

if (!OPENAI_API_KEY) {
    console.log("No OPENAI_API_KEY provided. Exiting.")
}

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function getContent(trending: string): string {
    return `write a blog post using the topic "${trending}". It should be 2000 words and be written in the style of a blog post. The tone can be similar to a news article, but it is a blog post. The output format of the blog post should be in markdown format. Do not include images. Maintain an upper word count of 2000 words but do not output the word count of each section. Prefer to finish the blog post before your token limit is reached`;
}

(async () => {
    const response = await fetch(TRENDING_URL);
    const { trending } = await response.json();

    console.log(`Got value for trending: "${trending}"`)
    console.log(`Generating blogpost...`)

    const chatCompletion = await openai.createChatCompletion({
        model: OPENAI_MODEL,
        messages: [{ role: "user", content: getContent(trending) }],
    });
    console.log(chatCompletion.data.choices[0].message);
})()

