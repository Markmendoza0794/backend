import * as usermodels from '../models/usermodels.js';
import ValidationError from '../utils/ValidationError.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

// VALIDATION
const doesUserExist = async (email) => {
    const existing = await usermodels.findUserByEmail(email);

    if (existing.length > 0) {
        return {
            result: true,
            user: existing[0]
        };
    }

    return {
        result: false,
        user: undefined
    };
};

// SIGN UP
export const createaccount = async (user) => {
    if (!user.name || !user.email || !user.password) {
        throw new ValidationError(
            400,
            'Name, email and password is required!'
        );
    }

    // Check if email is correct
    if (!validator.isEmail(user.email)) {
        throw new ValidationError(
            400,
            'Improper email format.'
        );
    }

    // Check if password is strong enough
    if (!validator.isStrongPassword(user.password)) {
        throw new ValidationError(
            400,
            'Password is not strong enough.'
        );
    }

    const existing = await doesUserExist(user.email);

    if (existing.result) {
        throw new ValidationError(
            400,
            'An account with that email already exists.'
        );
    }

    // SECURITY
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    // INSERT OPERATION
    const result = await usermodels.insert(
        user.name,
        user.email,
        hashedPassword
    );

    if (!result || result <= 0) {
        throw new Error(
            'Unable to create an account. Please try again later.'
        );
    }

    return 'Account created successfully!';
};

// LOGIN
export const login = async (user) => {
    if (!user.email || !user.password) {
        throw new ValidationError(
            400,
            'Email and password is required!'
        );
    }

    // Check if email exists
    const existing = await doesUserExist(user.email);

    if (!existing.result) {
        throw new ValidationError(
            400,
            'An account with that email does not exist.'
        );
    }

    // Check if password is correct
    const isCorrectPassword = await bcrypt.compare(
        user.password,
        existing.user.password
    );

    if (!isCorrectPassword) {
        throw new ValidationError(
            400,
            'Incorrect password.'
        );
    }

    return 'Login successfully!';
};