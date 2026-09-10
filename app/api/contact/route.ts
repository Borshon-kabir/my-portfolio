import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER!;
    const gmailPass = process.env.GMAIL_APP_PASSWORD!;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact me directly.' },
        { status: 500 }
      );
    }

    // Create Nodemailer Transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanType = String(projectType || 'General Inquiry').trim();
    const cleanMessage = String(message).trim();

    // HTML Email Template matching the portfolio's luxury aesthetic
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f4f4f6; border-radius: 16px; color: #15151a;">
        <div style="background-color: #17171d; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.02em;">New Project Enquiry</h2>
          <p style="color: #a8a9b0; margin: 6px 0 0; font-size: 13px;">via Borshon Kabir Portfolio</p>
        </div>

        <div style="background-color: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #e0e2e6; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="margin-bottom: 20px;">
            <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7b83;">Client Name</p>
            <p style="margin: 4px 0 0; font-size: 16px; font-weight: 600; color: #15151a;">${cleanName}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7b83;">Email Address</p>
            <p style="margin: 4px 0 0; font-size: 16px; color: #15151a;">
              <a href="mailto:${cleanEmail}" style="color: #17171d; text-decoration: underline; font-weight: 500;">${cleanEmail}</a>
            </p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7b83;">Project Type</p>
            <p style="margin: 4px 0 0; font-size: 15px; color: #15151a; font-weight: 500;">
              <span style="display: inline-block; background-color: #f4f4f6; border: 1px solid #e0e2e6; padding: 4px 12px; border-radius: 999px; font-size: 13px;">${cleanType}</span>
            </p>
          </div>

          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #edeef1;">
            <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7b83;">Message</p>
            <div style="margin-top: 8px; font-size: 14px; line-height: 1.6; color: #34343a; white-space: pre-wrap; background-color: #fafafb; padding: 16px; border-radius: 8px; border: 1px solid #edeef1;">${cleanMessage}</div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #8e8f96;">
          <p style="margin: 0;">You can reply directly to this email to contact ${cleanName}.</p>
        </div>
      </div>
    `;

    // Mail options
    const mailOptions = {
      from: `"${cleanName}" <${gmailUser}>`,
      replyTo: cleanEmail,
      to: gmailUser,
      subject: `New Project Enquiry: ${cleanName} — ${cleanType}`,
      text: `New Project Enquiry from ${cleanName} (${cleanEmail})\n\nProject Type: ${cleanType}\n\nMessage:\n${cleanMessage}`,
      html: htmlContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Your enquiry has been received successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Nodemailer Error:', error);

    if (error?.responseCode === 535 || error?.code === 'EAUTH') {
      return NextResponse.json(
        {
          error:
            'Gmail authentication failed (BadCredentials). Google requires a 16-character App Password generated at https://myaccount.google.com/apppasswords rather than your main account password.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          error?.message ||
          'Failed to send message. Please try again or reach out directly at borshonkabiredits@gmail.com',
      },
      { status: 500 }
    );
  }
}
