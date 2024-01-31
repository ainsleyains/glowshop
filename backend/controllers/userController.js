import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

//@desc login user & get token
//@route GET /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('login User');
});

//@desc register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register User');
});

//@desc logout user /clear cookie
//@route POST/api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout User');
});

//@desc get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});

//@desc update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

//@desc Get users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

//@desc Get user by ID
//@route GET /api/users/:id
//@access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

//@desc Delete user
//@route Delete /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

//@desc Update uses
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
};
