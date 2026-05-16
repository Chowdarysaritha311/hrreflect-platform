import nodemailer from 'nodemailer';

const createTransport = () =>
  nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

// ── Candidate confirmation email ──────────────────────────────────────────────
export const sendCandidateConfirmation = async ({ name, email, jobTitle }) => {
  if (!process.env.SMTP_USER) return; // Skip if not configured
  try {
    const transporter = createTransport();
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM || `HRReflect <${process.env.SMTP_USER}>`,
      to:      email,
      subject: `✅ Application Received — ${jobTitle}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f9fafb;border-radius:12px;">
          <h2 style="color:#F97316;margin-bottom:8px;">Application Received!</h2>
          <p style="color:#374151;">Hi <strong>${name}</strong>,</p>
          <p style="color:#374151;">
            Thank you for applying for the <strong>${jobTitle}</strong> position through HRReflect.
            Our recruitment team will review your profile and get back to you within <strong>24–48 hours</strong>.
          </p>
          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="margin:0;color:#6b7280;font-size:14px;">Role Applied For</p>
            <p style="margin:4px 0 0;color:#111827;font-weight:600;">${jobTitle}</p>
          </div>
          <p style="color:#6b7280;font-size:13px;">Best regards,<br><strong>HRReflect Recruitment Team</strong></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
          <p style="color:#9ca3af;font-size:11px;">
            HRReflect | Bangalore, India<br>
            This is an automated message — please do not reply directly.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('📧 Failed to send candidate confirmation:', err.message);
  }
};

// ── Admin new-application notification ───────────────────────────────────────
export const sendAdminNotification = async ({ application, jobTitle }) => {
  if (!process.env.SMTP_USER || !process.env.ADMIN_EMAIL) return;
  try {
    const transporter = createTransport();
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM || `HRReflect <${process.env.SMTP_USER}>`,
      to:      process.env.ADMIN_EMAIL,
      subject: `🔔 New Application — ${jobTitle} (${application.name})`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f9fafb;border-radius:12px;">
          <h2 style="color:#F97316;margin-bottom:8px;">New Application Received</h2>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
            ${[
              ['Candidate',   application.name],
              ['Email',       application.email],
              ['Phone',       application.phone],
              ['Location',    application.location || '—'],
              ['Experience',  application.experience],
              ['Skills',      application.skills    || '—'],
              ['Role Applied',jobTitle],
            ].map(([l, v]) => `
              <tr>
                <td style="padding:10px 14px;background:#f9fafb;color:#6b7280;font-size:13px;width:130px;border-bottom:1px solid #e5e7eb;">${l}</td>
                <td style="padding:10px 14px;color:#111827;font-size:13px;border-bottom:1px solid #e5e7eb;">${v}</td>
              </tr>`).join('')}
          </table>
          ${application.coverLetter ? `
          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Cover Letter</p>
            <p style="margin:0;color:#374151;font-size:14px;">${application.coverLetter}</p>
          </div>` : ''}
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin"
             style="display:inline-block;margin-top:16px;padding:12px 24px;background:#F97316;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
            View in Admin Dashboard →
          </a>
        </div>
      `,
    });
  } catch (err) {
    console.error('📧 Failed to send admin notification:', err.message);
  }
};
