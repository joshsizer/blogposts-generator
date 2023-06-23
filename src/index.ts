import { Configuration, OpenAIApi } from "openai";

var trending = "";

(async () => {
    fetch("http://localhost:3000").then(async response => {
        ({ trending } = await response.json());
    }).catch(err => {
        console.log(err)
    })
})()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

var content = `write a blog post using the topic "${trending}". It should be 2000 words and be written in the style of a blog post. The tone can be similar to a news article, but it is a blog post. The output format of the blog post should be in markdown format. Do not include images. Maintain an upper word count of 2000 words but do not output the word count of each section. Prefer to finish the blog post before your token limit is reached`;

(async () => {
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content}],
      });
    console.log(chatCompletion.data.choices[0].message);
})()

