const { createTextFile } = require("../../../helper/common_helper")
const { groupQuestionsByCategory,bulkCreate } = require("../model/question_model")
const fs = require('fs');
const csv = require('csv-parser');


exports.questionListService=async(req,res)=>{
    try {
     const questionListData= await groupQuestionsByCategory(req,res)
     return questionListData
    } catch (error) {
        throw error
    }
}

exports.readAndCheckCSV = async (filePath) => {
    try {
        const headers = [];
        const data = [];
        // Read the CSV file
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('headers', (headerList) => {
                    headers.push(...headerList);
                })
                .on('data', (row) => {
                    valid = true;
                    const rowData = {};
                    let options=[]
                    let categoriesdata=[]
                    headers.forEach((header) => {
                        rowData[header] = typeof row[header] === 'string' ? row[header].trim() : row[header];
                        header=="option"&&rowData[header].split(",").map((item,index)=>{
                            options.push({option_id:index+1,answer:item})
                        })
                        header=="categories"&&rowData[header].split(",").map((item,index)=>{
                            categoriesdata.push(
                                {
                                category_id:item.split("=")[0],category_name:item.split("=")[1]})
                        })

                    });
                    rowData.option=options
                    rowData.categories=categoriesdata
                    data.push(rowData);
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
        return null;
    }
};


exports.questionCreateService=async(req,res)=>{
    try {
        if (!req.file) {
            throw "please provide a file"
        }
     const filePath=req.file.path 
     const csvdata=await this.readAndCheckCSV(filePath)
     const questionListData= await bulkCreate(csvdata.successdata,filePath)
     return questionListData
    } catch (error) {
        throw error
    }
}