const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createActivationEmail = ({
  firstName,
  lastName,
  email,
  root,
  resetPasswordToken,
}) => {
  return {
    to: email,
    from: "support@crossroadscenter.app",
    subject: "Crossroads Account Activation",
    text: `Hi ${firstName} ${lastName},

    We've created your account.

    Please visit this link to set your password: ${root}/p/set/${resetPasswordToken}

    If you have any questions, please email support@crossroadscenter.app.

    Best,
    Crossroads
    `,
    html: `<p>Hi ${firstName} ${lastName},</p>
    <br></br>
    <p>We've created your account.</p>
    <br></br>
    <p>Please visit this <span><a href=${root}/p/set/${resetPasswordToken}>link</a></span> to set your password.</p>
    <br></br>
    <p>If you have any questions, please contact our <a href=mailto:support@crossroadscenter.app>support team</a>.</p>
    <br></br>
    <p>Best,</p>
    <p>Crossroads</p>
    `,
  };
};

const createForgotPasswordEmail = ({
  firstName,
  lastName,
  email,
  root,
  resetPasswordToken,
}) => {
  return {
    to: email,
    from: "support@crossroadscenter.app",
    subject: "Reset Your Crossroads Password",
    text: `
    Hi ${firstName} ${lastName},

    We've received your request to reset your password.

    All you need to do is click on the link below and enter your new password in the box provided:

    ${root}/p/reset/${resetPasswordToken}

    If you have any questions, please email support@crossroadscenter.app.
    `,
    html: `
    <p>Hi ${firstName} ${lastName},</p>
    <br></br>
    <p>We've received your request to reset your password.</p>
    <br></br>
    <p>All you need to do is click on this <span><a href=${root}/p/reset/${resetPasswordToken}>link</a></span> and enter your new password in the box provided.</p>
    <br></br>
    <p>If you have any questions, please contact our <a href=mailto:support@crossroadscenter.app>support team</a>.</p>
    <br></br>
    <p>Best,</p>
    <p>Crossroads</p>
    `,
  };
};

const createPasswordChangedEmail = ({ firstName, lastName, email }) => {
  return {
    to: email,
    from: "support@crossroadscenter.app",
    subject: "Your Crossroads Password Was Changed",
    text: `
    Hi ${firstName} ${lastName},

    The password to your Crossroads account was just changed.

    If you did not request this change, please email support@crossroadscenter.app to get help securing your account.

    Best,
    Crossroads
    `,
    html: `
    <p>Hi ${firstName} ${lastName},</p>
    <br></br>
    <p>The password to your Crossroads account was just changed.</p>
    <br></br>
    <p>If you did not request this change, please contact our <a href=mailto:support@crossroadscenter.app>support team</a> to get help securing your account.</p>
    <br></br>
    <p>Best,</p>
    <p>Crossroads</p>`,
  };
};

const createFailureEmail = ({ submitted, date, user, answers, student }) => {
  return {
    to: "kellyy@crossroadcenter.org",
    from: "support@crossroadscenter.app",
    subject: student
      ? `${student.firstName} ${
          student.lastName
        } Failed Screener for ${new Date(date).toLocaleDateString()}`
      : `${user.firstName} ${user.lastName} Failed Screener for ${new Date(
          date
        ).toLocaleDateString()}`,
    text: student
      ? `
      Hi Kelly,

      ${student.firstName} ${student.lastName} failed their COVID-19 screener.

      SUBMITTED ON: ${submitted}

      SUBMITTED FOR: ${date}

      SUBMITTED BY: ${user.firstName} ${user.lastName}, ${user.email}, ${
          user.phone
        }

      RESPONSES:

      ${answers.map(
        (answer) => `• ${answer.question.question}: ${answer.value}`
      )}

      Best,
      Matt
      `
      : `
    Hi Kelly,

    ${user.firstName} ${
          user.lastName
        } just failed their COVID-19 screener for ${new Date(
          date
        ).toLocaleDateString()}.

    Below are the ${
      answers.filter(
        (answer) =>
          answer.question.question !==
            "I agree that the above information is true and correct to the best of my knowledge." &&
          answer.value === true
      ).length
    } questions ${user.firstName} failed:

      ${answers
        .filter(
          (answer) =>
            answer.question.question !==
              "I agree that the above information is true and correct to the best of my knowledge." &&
            answer.value === true
        )
        .map(
          (answer) => `
      • ${answer.question.question}
      `
        )
        .join("")}

    Best,
    Matt
`,
  };
};

const sendActivationEmail = ({
  firstName,
  lastName,
  email,
  resetPasswordToken,
}) => {
  sgMail
    .send(
      createActivationEmail({
        firstName,
        lastName,
        email,
        resetPasswordToken,
        root: "https://crossroads-center.herokuapp.com",
      })
    )
    .then(() => console.log("Email sent."))
    .catch((err) => console.log(err));
};

const sendForgotPasswordEmail = async ({
  firstName,
  lastName,
  email,
  resetPasswordToken,
}) => {
  try {
    await sgMail.send(
      createForgotPasswordEmail({
        firstName,
        lastName,
        email,
        resetPasswordToken,
        root: "https://crossroads-center.herokuapp.com",
      })
    );

    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};

const sendPasswordChangedEmail = async ({ firstName, lastName, email }) => {
  try {
    await sgMail.send(
      createPasswordChangedEmail({ firstName, lastName, email })
    );

    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};

const sendFailureEmail = async ({
  submitted,
  date,
  user,
  answers,
  student,
}) => {
  try {
    await sgMail.send(
      createFailureEmail({ submitted, date, user, answers, student })
    );

    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendActivationEmail,
  sendForgotPasswordEmail,
  sendPasswordChangedEmail,
  sendFailureEmail,
};
