import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface userDocument extends mongoose.Document {
	email: string;
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	let user = this as userDocument;

	if (!user.isModified('password')) {
		return next();
	}

	const hash = await bcrypt.hashSync(user.password, 10);

	user.password = hash;
});

userSchema.methods.comparePasswords = async function (
	password: string
): Promise<boolean> {
	const user = this as userDocument;

	return bcrypt.compare(password, user.password).catch((e) => false);
};

export const User = mongoose.model('User', userSchema);
