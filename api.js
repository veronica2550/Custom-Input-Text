import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBdm1DgIk1NcN0zcjdDbzzEFNEINu1lwNo";
const genAI = new GoogleGenerativeAI(API_KEY);

async function analyzeText(text) {
    try {
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent({
            prompt: `다음 텍스트에서 악성 표현이나 경고 표현을 검사하고, 해당 단어들을 반환해주세요: ${text}`,
            maxTokens: 100, // 필요한 만큼 조절
            language: "ko", // 한국어로 응답 받기
        });

        const response = await result.json();
        const analysis = response.choices[0].text;

        // 응답이 forbiddenWords와 warningWords를 포함한다고 가정
        const { forbiddenWords, warningWords } = JSON.parse(analysis);
        return { forbiddenWords, warningWords };
    } catch (error) {
        console.error("텍스트 분석 중 오류 발생:", error);
        return { forbiddenWords: [], warningWords: [] };
    }
}

export default analyzeText;
