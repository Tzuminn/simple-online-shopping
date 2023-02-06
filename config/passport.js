const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const FacebookTokenStrategy = require('passport-facebook-token')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LineStrategy = require('passport-line-auth')
const bcrypt = require('bcryptjs')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const { User } = require('../models')

