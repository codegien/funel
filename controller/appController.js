const { text } = require("express");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const { MailtrapClient } = require("mailtrap");

const { blogSchema } = require("../model/blog_schemer.js");

require("dotenv").config();

const EMAIL = process.env.PSN;
const PASS = process.env.SC;
const TOKEN = process.env.TRAPTOKEN;
const ENDPOINT = "https://send.api.mailtrap.io/";

const signup = async (req, res) => {
	/** testing account */
	let testAccount = await nodemailer.createTestAccount();
	console.log(testAccount);
	// Create reusable transporter object instance using default smtp transport
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	let message = {
		from: '"Emmanuel🤝" <codegienuel@gmail.com>',
		to: "info.techbrains24@gmail.com, craftybrain.com@gmail.com",
		subject: "testing outcome",
		text: "test outcome success rate",
		html: "<div> <p>Good beginning</p></div>",
	};

	transporter
		.sendMail(message)
		.then((info) => {
			return res.status(201).json({
				msg: "check your mail inbox",
				info: info.messageId,
				preview: nodemailer.getTestMessageUrl(info),
			});
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json(error);
		});
};

const getbill = (req, res) => {
	const { recipient } = req.body;
	console.log("Bill incoming");
	console.log(EMAIL, PASS);
	// res.json({ bill: "bill" });

	let config = {
		service: "gmail",
		auth: {
			user: "",
			pass: "",
		},
	};

	let transporter = nodemailer.createTransport(config);

	let MailGenerator = new mailgen({
		theme: "default",
		product: {
			name: "Mailgen",
			link: "https://mailgen.js",
		},
	});

	let response = {
		body: {
			name: "Telerik",
			intro: "Your bill has arrived!",
			table: {
				data: [
					{
						item: "Nodemailer Stack Book",
						description: "A Backend application",
						price: "$10.99",
					},
				],
			},
			outro: "Looking forward to seeing you more",
		},
	};

	let mail = MailGenerator.generate(response);
	let message = {
		from: EMAIL,
		to: recipient,
		subject: "Confirm your bill",
		html: mail,
	};

	transporter
		.sendMail(message)
		.then(() => {
			return res.status(201).json({
				msg: "You should get a mail",
			});
		})
		.catch((error) => {
			return res.status(500).json({ error });
		});
};

const sendTrap = (req, res) => {
	let client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
	let { visitor, content } = req.body;
	console.log(visitor, content);
	const sender = {
		email: "mailtrap@demomailtrap.com",
		name: "Mailtrap Test",
	};
	const recipients = [
		{
			email: "info.techbrains24@gmail.com",
		},
	];

	client
		.send({
			from: sender,
			to: recipients,
			subject: "New mailfrom your portfolio",
			text: `${visitor} says: ${content}`,
			category: "Integration Test",
		})
		.then((info) => {
			console.log(info);
			return res.status(200).json({ msg: info });
		})
		.catch((err) => {
			return res.status(500).json({ error: err });
		});
};

const createBlog = (req, res) => {
	const { title, read, content, image } = req.body;
	const newBlog = new blogSchema({
		title: title,
		read: read,
		content: content,
		image: image,
	});

	newBlog
		.save()
		.then(() => {
			console.log("Blog created");
			return res.status(200).json({ message: "Blog created" });
		})
		.catch((err) => console.log(err));
};

const getBlogs = async (req, res) => {
	const blogs = [
		{
			title: "AI ERA",
			read: "5 Min",
			image: "",
			content:
				"Our life in this modern age depends largely on computers. It is almost impossible to think about life without computers. We need computers in everything that we use in our daily lives. So it becomes very important to make computers intelligent so that our lives become easy. Artificial Intelligence is the theory and development of computers, which imitates the human intelligence and senses, such as visual perception, speech recognition, decision-making, and translation between languages. Artificial Intelligence has brought a revolution in the world of technology.",
		},
	];

	return res.status(200).json({ blogs: blogs });
};
module.exports = { signup, getbill, sendTrap, getBlogs, createBlog };
