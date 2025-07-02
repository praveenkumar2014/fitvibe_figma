import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: `"FitVibe" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html: html || `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">FitVibe</h1>
          </div>
          <div style="padding: 20px; background: #f9fafb;">
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">${text}</p>
          </div>
          <div style="background: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>© 2024 FitVibe. All rights reserved.</p>
            <p>Your ultimate fitness companion</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to FitVibe! 🎉';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to FitVibe!</h1>
        <p style="color: #dcfce7; margin: 10px 0 0 0;">Your fitness journey starts here</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #374151; margin-bottom: 20px;">Hi ${user.firstName}! 👋</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
          Thank you for joining FitVibe! We're excited to help you achieve your fitness goals.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #15803d; margin-top: 0;">🚀 Get Started:</h3>
          <ul style="color: #374151; line-height: 1.8;">
            <li>Complete your profile setup</li>
            <li>Set your fitness goals</li>
            <li>Browse our workout library</li>
            <li>Connect with certified trainers</li>
            <li>Track your nutrition</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/profile" 
             style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Complete Your Profile
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
          Need help? Reply to this email or contact our support team.
        </p>
      </div>
      
      <div style="background: #e5e7eb; padding: 20px; text-align: center;">
        <p style="font-size: 12px; color: #6b7280; margin: 0;">
          © 2024 FitVibe. All rights reserved.
        </p>
      </div>
    </div>
  `;
  
  return sendEmail(user.email, subject, '', html);
};

export const sendConsultationConfirmation = async (consultation, user, consultant) => {
  const subject = 'Consultation Confirmed - FitVibe';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Consultation Confirmed! 📅</h1>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #374151;">Hi ${user.firstName}!</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Your consultation with <strong>${consultant.firstName} ${consultant.lastName}</strong> has been confirmed.
        </p>
        
        <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1d4ed8; margin-top: 0;">📋 Consultation Details:</h3>
          <ul style="color: #374151; line-height: 1.8; list-style: none; padding: 0;">
            <li><strong>Date:</strong> ${new Date(consultation.scheduledAt).toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${new Date(consultation.scheduledAt).toLocaleTimeString()}</li>
            <li><strong>Duration:</strong> ${consultation.duration} minutes</li>
            <li><strong>Type:</strong> ${consultation.type}</li>
            <li><strong>Mode:</strong> ${consultation.mode}</li>
          </ul>
        </div>
        
        ${consultation.meeting.meetingUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${consultation.meeting.meetingUrl}" 
               style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Join Meeting
            </a>
          </div>
        ` : ''}
        
        <p style="font-size: 14px; color: #6b7280;">
          You'll receive a reminder 15 minutes before your consultation.
        </p>
      </div>
    </div>
  `;
  
  return sendEmail(user.email, subject, '', html);
};