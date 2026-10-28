export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const {
      name,
      email,
      topic,
      orderNumber,
      subject,
      message,
    } = request.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return response.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 200 ||
      message.length > 3000 ||
      (topic != null && (typeof topic !== "string" || topic.length > 100)) ||
      (orderNumber != null &&
        (typeof orderNumber !== "string" || orderNumber.length > 100))
    ) {
      return response.status(400).json({
        success: false,
        message: "One or more fields are too long.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return response.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram environment variables are missing.");
      return response.status(500).json({
        success: false,
        message: "Notification service is not configured.",
      });
    }

    const escapeHtml = (value) =>
      String(value ?? "").replace(/[&<>"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[character]);

    const text = [
      "🛍️ <b>New VeloShop Contact Message</b>",
      "",
      `<b>Name:</b> ${escapeHtml(name.trim())}`,
      `<b>Email:</b> ${escapeHtml(email.trim())}`,
      `<b>Topic:</b> ${escapeHtml(topic || "General question")}`,
      `<b>Order Number:</b> ${escapeHtml(orderNumber || "N/A")}`,
      `<b>Subject:</b> ${escapeHtml(subject.trim())}`,
      "",
      "<b>Message:</b>",
      escapeHtml(message.trim()),
    ].join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
        signal: AbortSignal.timeout(10000),
      },
    );
    const result = await telegramResponse.json();

    if (!telegramResponse.ok || !result.ok) {
      console.error("Telegram notification failed:", result.description);
      return response.status(502).json({
        success: false,
        message: "Unable to send your message. Please try again.",
      });
    }

    return response.status(200).json({
      success: true,
      message: "Your message was sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error.message);
    return response.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}
