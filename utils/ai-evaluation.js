const OpenAI = require('openai');
const OpeningRepository = require('../repositories/openingRepository');
const ApplicantRepository = require('../repositories/applyRepository');
const parsePdf = require('./pdf-reader');
const path = require('path');

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
});

async function evaluate(applicantId, openingId) {
	try {
		const openingData = await OpeningRepository.getById(openingId);
		let applicantData = await ApplicantRepository.getById(applicantId);

		jobDescription = openingData.dataValues.description;
		applicantData = applicantData.dataValues;

		const fileName = path.join(__dirname, '../cv-uploads', applicantData.cv);

		const cvData = await parsePdf(fileName);
		const query =
			"As an AI reviewer, meticulously assess job application CVs based on the provided text. Return a JSON response with two parameters: 'match' and 'rating,' both on a scale from 1 to 10. The 'rating' reflects overall suitability based on experience and education (ranging from 0 to 10). 'Match' signifies the alignment of the CV with a specific job opening (ranging from 1 to 10). Only these two parameters are required in the JSON response. How to Evaluate the CV: Rating (0-10): Evaluate the candidate's educational background, professional experience, and skills. Assign a rating for education, experience, and skills separately. Match (1-10): Assess the alignment between the candidate's CV and the specified job opening. Consider skills, achievements, and professional goals. Assign a match rating based on this alignment. Return in JSON Format. Please provide only these two parameters in the JSON response, adhering strictly to the specified rating scales. The rating should strictly be an integer and not a double";

		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: `${query}. The JOB OPENING DESCRIPTION: ${jobDescription}. THE CV OF THE APPLICANT: ${cvData}`,
				},
			],
			model: 'gpt-3.5-turbo',
		});

		return JSON.parse(completion.choices[0].message.content);
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = evaluate;
