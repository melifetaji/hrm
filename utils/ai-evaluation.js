const OpenAI = require('openai');
const OpeningRepository = require('../repositories/openingRepository');
const ApplicantRepository = require('../repositories/applyRepository');
const parsePdf = require('./pdf-reader');
const path = require('path');

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
});

async function evaluate(applicantId, openingId) {
	const openingData = await OpeningRepository.getById(openingId);
	let applicantData = await ApplicantRepository.getById(applicantId);

	jobDescription = openingData.dataValues.description;
	applicantData = applicantData.dataValues;

	const fileName = path.join(__dirname, '../cv-uploads', applicantData.cv);

	const cvData = await parsePdf(fileName);

	return cvData;

	// const completion = await openai.chat.completions.create({
	// 	messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
	// 	model: 'gpt-3.5-turbo',
	// });
	// console.log(completion.choices[0]);
}

module.exports = evaluate;
