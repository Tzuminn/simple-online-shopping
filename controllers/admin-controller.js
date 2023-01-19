const jwt = require('jsonwebtoken')
const { Product, Image } = require('../models')
const imgurFileHandler = require('../helpers/file-helpers')

const adminController = {
  login: async (req, res, next) => {

  },
  putProduct: async (req, res, next) => {

  },
  deleteProduct: async (req, res, next) => {

  },
  getProducts: async (req, res, next) => {

  },
  postProduct: async (req, res, next) => {
    try {
    } catch (err) {
      next(err)
    }
  },
  getOrders: async (req, res, next) => {

  }
}

module.exports = adminController
