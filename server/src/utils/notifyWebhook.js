const axios = require('axios');

// Best-effort notification (e.g. Slack/Discord incoming webhook) when a new
// public inquiry/appointment request comes in. No-ops silently if unconfigured
// or unreachable so it never blocks the actual API response.
const notifyNewInquiry = async (inquiry) => {
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) return;

  const text =
    `New ${inquiry.type} request on BMU CMS\n` +
    `Name: ${inquiry.name}\n` +
    `Email: ${inquiry.email}\n` +
    `Subject: ${inquiry.subject || '(none)'}`;

  try {
    await axios.post(url, { text }, { timeout: 4000 });
  } catch (err) {
    console.warn(`Inquiry webhook notification failed: ${err.message}`);
  }
};

module.exports = { notifyNewInquiry };
