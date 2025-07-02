import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to, message) => {
  try {
    // Ensure phone number is in correct format
    const phoneNumber = to.startsWith('+') ? to : `+91${to}`;
    
    const result = await client.messages.create({
      body: `FitVibe: ${message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    console.log('✅ SMS sent:', result.sid);
    return result;
  } catch (error) {
    console.error('❌ SMS error:', error);
    throw error;
  }
};

export const sendOTPSMS = async (phone, otp) => {
  const message = `Your FitVibe verification code is: ${otp}. Valid for 10 minutes. Do not share this code.`;
  return sendSMS(phone, message);
};

export const sendConsultationReminder = async (phone, consultantName, time) => {
  const message = `Reminder: Your consultation with ${consultantName} is starting in 15 minutes at ${time}. Join via the FitVibe app.`;
  return sendSMS(phone, message);
};

export const sendOrderUpdate = async (phone, orderNumber, status) => {
  const message = `Order ${orderNumber} update: ${status}. Track your order in the FitVibe app.`;
  return sendSMS(phone, message);
};