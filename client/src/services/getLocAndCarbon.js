// gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from "dotenv"

// dotenv.config()

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(API_KEY);

// Template function to use Gemini 1.5 or 1.0 Pro
export async function getLocAndCarbon(cit, array) {
  console.warn("API KEY: ", API_KEY)
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent('what city would be nearest to '+ cit +' from [ '+ array.join(', ') +' ], give the answer in the format [ { "cityName": cityNameInQuotes, "dist": approxDistanceInKm }, ... ], the answers should be in increasing order of distance dont give any other details and the format should be exactly as specified, if told double quotes then use only double quotes, dont also give me any wrapping in backticks with code type specification');
    const response = await result.response;
    const text = response.text();
    // console.log(text);

    const distData = JSON.parse(text.trim());

    // const Cresult = await model.generateContent("A mid sized truck cosumes 12 lt every 100km, one liter of diesel will typically emit around 2.65 kilograms. What is the average carbon footprint of a Medium Sized Truck running on diesel for " + distData.dist + " answer in kilograms with no unit, only give me the number");
    // const Cresponse = await Cresult.response;
    // const Ctext = Cresponse.text();
    // console.log(Ctext);

    //  +" "+ (Number.parseInt(distData.dist)*2.65*12/100)
    // const CarbData = Number(Ctext)+" "+ (Number.parseInt(distData.dist)*2.65*12/100);
    const finalData = distData.map((city) => {
        return {
            ...city,
            "carbon": Number.parseInt(city.dist)*2.65*12/100,
        }
    })

    return finalData;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}

// let daaaaWorrrrld = await getLocAndCarbon("kota", ["jaipur", "bhilwara", "delhi", "mumbai"]);
// console.log(daaaaWorrrrld);
