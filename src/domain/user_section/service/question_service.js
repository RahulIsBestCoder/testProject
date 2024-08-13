const { createTextFile, removeFile } = require("../../../helper/common_helper")
const { groupQuestionsByCategory, bulkCreate } = require("../model/question_model")
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;
exports.questionListService = async (req, res) => {
    try {
        const questionListData = await groupQuestionsByCategory(req, res)
        return questionListData
    } catch (error) {
        throw error
    }
}


exports.readAndCheckCSV = async (filePath) => {
    try {
        const headers = [];
        const data = [];

        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('headers', (headerList) => {
                    headers.push(...headerList);
                })
                .on('data', (row) => {
                    let valid = true;
                    const rowData = {};
                    let options = [];
                    let categoriesData = [];
                    let failed_row = []

                    headers.forEach((header) => {
                        const value = typeof row[header] === 'string' ? row[header].trim() : row[header];
                        rowData[header] = value;

                        // Validation for 'question' column
                        if (header === "question" && (!value || typeof value !== 'string')) {
                            valid = false;
                            console.error(`Invalid question value: ${value}`);
                        }

                        // Validation for 'option' column
                        if (header === "option" && value) {
                            options = value.split(",").map((item, index) => {
                                return { option_id: index + 1, answer: item.trim() };
                            });
                        }

                        // Validation for 'categories' column
                        if (header === "categories" && value) {
                            categoriesData = value.split(",").map((item) => {
                                const [categoryId, categoryName] = item.split("=");
                                if (!isValidObjectId(categoryId) || !categoryName) {
                                    valid = false;
                                    console.error(`Invalid category data: ${item}`);
                                }
                                return { category_id: categoryId.trim(), category_name: categoryName.trim() };
                            });
                        }

                        // Validation for 'rightOption' (assuming it's part of CSV or needs default)
                        if (header === "rightOption" && (!value || isNaN(value))) {
                            valid = false;
                            console.error(`Invalid rightOption value: ${value}`);
                        }
                    });

                    if (valid) {
                        rowData.option = options;
                        rowData.categories = categoriesData;
                        data.push(rowData);
                    } else {
                        console.error("Invalid row data, skipping row:", rowData);
                    }
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });

        return {
            successdata: data,
        };
    } catch (error) {
        console.error("Error processing CSV:", error);
        return null;
    }
};

// csv format is in like

// column names=>   question	        option	                rightOption	        categories
// row 1=>          what is your name?	srk,salman,rahul,simal	    1	            66ba5b980511533c49c2681c=cinema,66ba5b980511533c49c2681c=maths
// row 2=>          what is your name?	srk,salman,rahul,simal	    2	            66ba5b980511533c49c2681c=cinema,66ba5b980511533c49c2681c=maths

// please follow the schema and valid datatype to upload csv
exports.questionCreateService = async (req, res) => {
    try {
        if (!req.file) {
            throw "please provide a file"
        }
        const filePath = req.file.path
        const csvdata = await this.readAndCheckCSV(filePath)
        const questionListData = await bulkCreate(csvdata.successdata, filePath)
            .then((response) => {
                removeFile(filePath)
                return response
            }).catch(() => {
                return []
            })
        return questionListData
    } catch (error) {
        throw error
    }
}