const Applicant = require('../models').applicant;
const ApplicantOpenings = require('../models').applicantOpening;
const ApplicantAI = require('../models').applicantAI;
const Opening = require('../models').opening;

class ApplicantRepository {
	async getById(id) {
		try {
			return await Applicant.findByPk(id);
		} catch (error) {
			throw new Error('Error retrieving applicant by ID');
		}
	}

	async create(data) {
		try {
			return await Applicant.create(data);
		} catch (error) {
			throw new Error('Error creating applicant');
		}
	}

	async delete(id) {
		try {
			return await Applicant.destroy({ where: { id: id } });
		} catch (error) {
			throw new Error('Error deleting applicant');
		}
	}

	async createApplicantOpening(aid, oid) {
		try {
			return await ApplicantOpenings.create({
				applicantId: aid,
				openingId: oid,
			});
		} catch (error) {
			throw new Error('Error creating applicant opening');
		}
	}
	async createApplicantAI(match, rating, id) {
		try {
			const ai = await ApplicantAI.create({
				match,
				rating,
				applicantId: id,
			});
			return ai;
		} catch (error) {
			throw new Error(error);
		}
	}
	async getApplicantsByOpening(openingId) {
		try {
			const applicants = await Applicant.findAll({
				include: [
					{
						model: Opening,
						through: {
							model: ApplicantOpenings,
							where: { openingId: openingId },
						},
						attributes: [],
						required: true,
					},
				],
			});
			return applicants;
		} catch (error) {
			throw new Error('Error retrieving applicants by opening');
		}
	}
	async getAll() {
		try {
			return await Applicant.findAll({ include: { model: ApplicantAI } });
		} catch (error) {
			throw new Error('Error retrieving applicants');
		}
	}
}

module.exports = new ApplicantRepository();
