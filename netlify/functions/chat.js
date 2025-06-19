const fetch = require("node-fetch");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
	  stream: true,
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: body.messages,
    }),
  });

  const data = await openRouterResponse.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

