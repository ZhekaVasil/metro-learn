const apiResponse = require("../helpers/apiResponse");
const fs = require('fs');
const path = require('path');

const sectionsPath = path.normalize('./sections')
// const sectionsPath = path.normalize(__dirname + '/../../../sections')

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
	function (req, res) {
		try {
			const term = req.params.term;
			return apiResponse.successResponseWithData(res, 'Operation success', term)
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
]
