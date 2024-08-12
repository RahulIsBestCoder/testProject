const { categoriesList } = require("../model/categories_model")

exports.catergorListService= async()=>{
  try {
    const categoryListData=await  categoriesList()
        return categoryListData
  } catch (error) {
     throw error
  }
}