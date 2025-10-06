export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { text, from, to } = await readBody(event);

  const prompt = `다음 텍스트를 ${from}에서 ${to}로 자연스럽게 번역해주세요. 번역된 결과만 출력하고 다른 설명은 하지 마세요:
${text}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.NUXT_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API 응답 오류:", errorText);

      if (response.status === 429) {
        throw createError({
          statusCode: 429,
          message:
            "Gemini 번역 일일 사용량이 초과되었습니다. 내일 다시 시도해주세요.",
        });
      }

      throw createError({
        statusCode: response.status,
        message: `번역 API 오류: ${response.status} - ${errorText}`,
      });
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content
    ) {
      throw createError({
        statusCode: 500,
        message: "API 응답 형식이 올바르지 않습니다.",
      });
    }

    return {
      translatedText: data.candidates[0].content.parts[0].text.trim(),
    };
  } catch (error) {
    console.error("번역 오류:", error);
    throw error;
  }
});
