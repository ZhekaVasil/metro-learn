const apiResponse = require("../helpers/apiResponse");
const fs = require('fs');
const path = require('path');
const WordExtractor = require("word-extractor");

const extractor = new WordExtractor();

const storage = {};

// const sectionsPath = path.normalize('./sections')
const sectionsPath = path.normalize(__dirname + '/../../../sections')

exports.sectionsList = [
	function (req, res) {
		try {
			const topList = fs.readdirSync(sectionsPath);
			const fullList = topList.reduce((prev, curr) => {
				const children = fs.readdirSync(sectionsPath + `/${curr}`);
				return [...prev, {parent: curr, children}]
			} ,[])
			return apiResponse.successResponseWithData(res, 'Operation success', fullList)
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
]

exports.sectionsSearch = [
	async function (req, res) {
	const response = [];
		try {
			const term = req.params.term.toLowerCase();
			Object.entries(storage || {}).forEach(([section = '', children = {}]) => {
				Object.entries(children).forEach(([child = '', text = '']) => {
					if (text.includes(term)) {
						response.push({section, child})
					}
				})
			})
			return apiResponse.successResponseWithData(res, 'Operation success', response)
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
]

exports.sectionsSync = [
	function (req, res) {
		try {
			const topList = fs.readdirSync(sectionsPath);
			topList.forEach(section => {
				const children = fs.readdirSync(sectionsPath + `/${section}`);
				children.forEach(async child => {
					try {
						const doc = await extractor.extract(sectionsPath + `/${section}/${child}`);
						storage[section] = storage[section] || {};
						storage[section][child] = doc.getBody().toLowerCase();
					} catch (error) {
						console.error(child);
						console.error(error);
					}
				})
			})
			return apiResponse.successResponseWithData(res, 'Operation success', 'done')
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
]
